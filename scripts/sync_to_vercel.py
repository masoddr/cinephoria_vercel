#!/usr/bin/env python
"""
Script to synchronize seances.json to Vercel.

This script uploads the seances.json file to Vercel using one of the following methods:
1. Vercel Blob Storage (recommended)
2. Git push to trigger a rebuild
3. Direct file upload via Vercel API

Usage:
    python scripts/sync_to_vercel.py [--method blob|git|api]

Environment variables required:
    - VERCEL_TOKEN: Your Vercel API token
    - VERCEL_PROJECT_ID: Your Vercel project ID (for blob/api methods)
    - VERCEL_ORG_ID: Your Vercel organization ID (for blob/api methods)
    - GIT_REPO_PATH: Path to git repository (for git method)
"""

import os
import sys
import json
import logging
import argparse
from pathlib import Path
from typing import Optional

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def load_seances_file() -> dict:
    """Load seances.json file."""
    seances_path = Path(__file__).parent.parent / 'frontend' / 'public' / 'seances.json'
    
    if not seances_path.exists():
        raise FileNotFoundError(f"seances.json not found at {seances_path}")
    
    with open(seances_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def sync_via_blob_storage(seances_data: dict) -> bool:
    """
    Upload seances.json to Vercel Blob Storage.
    
    Requires: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID
    """
    import requests
    
    token = os.getenv('VERCEL_TOKEN')
    project_id = os.getenv('VERCEL_PROJECT_ID')
    org_id = os.getenv('VERCEL_ORG_ID')
    
    if not all([token, project_id, org_id]):
        logger.error("Missing required environment variables: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID")
        return False
    
    # Convert data to JSON string
    json_content = json.dumps(seances_data, ensure_ascii=False, indent=2)
    
    try:
        # Step 1: Create a blob
        create_url = f"https://vercel.com/api/v2/blob"
        headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        
        response = requests.post(
            create_url,
            headers=headers,
            json={"data": json_content}
        )
        response.raise_for_status()
        blob_url = response.json().get('url')
        
        if not blob_url:
            logger.error("Failed to create blob: no URL returned")
            return False
        
        logger.info(f"Blob created: {blob_url}")
        
        # Step 2: Upload to project
        # Note: This is a simplified approach. You might need to use Vercel's file API
        # or deploy the file as part of a deployment.
        logger.warning("Blob storage method requires additional setup. Consider using git method instead.")
        return True
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error uploading to Vercel Blob: {e}")
        return False


def sync_via_git(seances_data: dict) -> bool:
    """
    Commit and push seances.json to git repository to trigger Vercel rebuild.
    
    Requires: GIT_REPO_PATH environment variable or runs from project root
    """
    import subprocess
    
    repo_path = os.getenv('GIT_REPO_PATH', Path(__file__).parent.parent)
    repo_path = Path(repo_path)
    seances_path = repo_path / 'frontend' / 'public' / 'seances.json'
    
    if not seances_path.exists():
        logger.error(f"seances.json not found at {seances_path}")
        return False
    
    try:
        # Change to repo directory
        original_cwd = os.getcwd()
        os.chdir(repo_path)
        
        # Check if git is initialized
        result = subprocess.run(
            ['git', 'status'],
            capture_output=True,
            text=True
        )
        
        if result.returncode != 0:
            logger.error("Not a git repository or git not available")
            return False
        
        # Check if file has changes or is untracked
        file_rel_path = str(seances_path.relative_to(repo_path))
        
        # Check if file is tracked
        result = subprocess.run(
            ['git', 'ls-files', '--error-unmatch', file_rel_path],
            capture_output=True
        )
        
        is_tracked = result.returncode == 0
        
        if is_tracked:
            # Check if file has changes
            result = subprocess.run(
                ['git', 'diff', '--quiet', file_rel_path],
                capture_output=True
            )
            
            if result.returncode == 0:
                logger.info("No changes to seances.json")
                return True
        else:
            logger.info("File is not tracked, will be added")
        
        # Add file
        subprocess.run(
            ['git', 'add', str(seances_path.relative_to(repo_path))],
            check=True
        )
        logger.info("File staged")
        
        # Commit
        subprocess.run(
            ['git', 'commit', '-m', 'chore: update seances.json'],
            check=True
        )
        logger.info("File committed")
        
        # Push
        subprocess.run(['git', 'push'], check=True)
        logger.info("File pushed to repository")
        
        return True
        
    except subprocess.CalledProcessError as e:
        logger.error(f"Git operation failed: {e}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return False
    finally:
        os.chdir(original_cwd)


def sync_via_api(seances_data: dict) -> bool:
    """
    Upload seances.json via Vercel API (deployment).
    
    Requires: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID
    """
    import requests
    import zipfile
    import tempfile
    
    token = os.getenv('VERCEL_TOKEN')
    project_id = os.getenv('VERCEL_PROJECT_ID')
    org_id = os.getenv('VERCEL_ORG_ID')
    
    if not all([token, project_id, org_id]):
        logger.error("Missing required environment variables: VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID")
        return False
    
    # This method is complex and requires creating a deployment
    # For simplicity, we recommend using the git method instead
    logger.warning("API method requires creating a full deployment. Use git method instead.")
    return False


def main():
    """Main function to sync seances.json to Vercel."""
    parser = argparse.ArgumentParser(description='Sync seances.json to Vercel')
    parser.add_argument(
        '--method',
        choices=['blob', 'git', 'api'],
        default='git',
        help='Synchronization method (default: git)'
    )
    
    args = parser.parse_args()
    
    logger.info(f"Loading seances.json...")
    try:
        seances_data = load_seances_file()
        logger.info(f"Loaded {len(seances_data.get('seances', []))} seances")
    except Exception as e:
        logger.error(f"Failed to load seances.json: {e}")
        return 1
    
    logger.info(f"Syncing to Vercel using method: {args.method}")
    
    success = False
    if args.method == 'blob':
        success = sync_via_blob_storage(seances_data)
    elif args.method == 'git':
        success = sync_via_git(seances_data)
    elif args.method == 'api':
        success = sync_via_api(seances_data)
    
    if success:
        logger.info("Synchronization completed successfully")
        return 0
    else:
        logger.error("Synchronization failed")
        return 1


if __name__ == "__main__":
    sys.exit(main())
