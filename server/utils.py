ALLOWED_EXTENSIONS = set(['pdf', 'txt'])

def get_file_type(filename):
    return filename.rsplit('.', 1)[1]

def allowed_file(filename):
    return '.' in filename and \
           get_file_type(filename) in ALLOWED_EXTENSIONS