import os
from dotenv import load_dotenv
from supabase import create_client, Client
import uuid

load_dotenv()

class ImageService:
    def __init__(self):
        self.supabase: Client = create_client(
            os.getenv("SUPABASE_URL"),
            os.getenv("SUPABASE_KEY")
        )
        self.bucket_name = "images" 
    
    def upload_image(self, file_path: str, folder: str = "uploads") -> dict:
        try:
            with open(file_path, "rb") as file:
                file_data = file.read()
            
            file_name = f"{uuid.uuid4()}_{os.path.basename(file_path)}"
            storage_path = f"{folder}/{file_name}"
            
            response = self.supabase.storage.from_(self.bucket_name).upload(
                storage_path,
                file_data
            )
            
            public_url = self.supabase.storage.from_(self.bucket_name).get_public_url(storage_path)
            
            return {
                "success": True,
                "url": public_url,
                "path": storage_path,
                "file_name": file_name
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def upload_image_from_bytes(self, file_bytes: bytes, file_name: str, folder: str = "uploads") -> dict:
        try:
            unique_name = f"{uuid.uuid4()}_{file_name}"
            storage_path = f"{folder}/{unique_name}"
            
            response = self.supabase.storage.from_(self.bucket_name).upload(
                storage_path,
                file_bytes
            )
            
            public_url = self.supabase.storage.from_(self.bucket_name).get_public_url(storage_path)
            
            return {
                "success": True,
                "url": public_url,
                "path": storage_path,
                "file_name": unique_name
            }
        except Exception as e:
            return {"success": False, "error": str(e)}
    
    def delete_image(self, storage_path: str) -> dict:
        try:
            self.supabase.storage.from_(self.bucket_name).remove([storage_path])
            return {"success": True, "message": "Image deleted"}
        except Exception as e:
            return {"success": False, "error": str(e)}