"""
This file will hold helper functions

"""
import uuid

 
def newID():
    """
    creates unique IDs for default IDs in the database
    
    Args:
        None
    Returns:
        Unique random universal IDs
    """
    return str(uuid.uuid4())