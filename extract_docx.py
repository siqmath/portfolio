import zipfile
import xml.etree.ElementTree as ET
import glob
import os

WORD_NAMESPACE = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
PARA = WORD_NAMESPACE + 'p'
TEXT = WORD_NAMESPACE + 't'

def get_docx_text(path):
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.XML(xml_content)
        paragraphs = []
        for paragraph in tree.iter(PARA):
            texts = [node.text for node in paragraph.iter(TEXT) if node.text]
            if texts:
                paragraphs.append(''.join(texts))
        return '\n'.join(paragraphs)
    except Exception as e:
        return f"Error reading {path}: {str(e)}"

docx_files = glob.glob(r'c:\Users\Matheus\repos\Portfolio\*.docx')
for f in docx_files:
    text = get_docx_text(f)
    out_f = f + ".txt"
    with open(out_f, 'w', encoding='utf-8') as out:
        out.write(text)
    print(f"Extracted: {f}")
