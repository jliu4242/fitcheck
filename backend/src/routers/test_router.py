from fastapi import APIRouter, status

router = APIRouter(tags=["test"])

@router.get("/", status_code=status.HTTP_200_OK)
def test():
    return "Hello, world!"