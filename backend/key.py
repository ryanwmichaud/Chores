import secrets

secret_key = secrets.token_hex(32)  

print("JWT key:", secret_key)
