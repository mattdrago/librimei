#!/bin/bash

LIBRARY_DIR=$1

if [ -z "$LIBRARY_DIR" ]; then
    echo "Supply a Library Folder"
    exit -1;
elif [ "${LIBRARY_DIR:(-1)}" == "/" ]; then
    LIBRARY_DIR=${LIBRARY_DIR:0:${#LIBRARY_DIR}-1}
fi

OLD_IFS=${IFS}
IFS=$'\n'

echo '{ "books": ['

SEPARATOR=""

for OPF_FILE in `find "${LIBRARY_DIR}" -name "*.opf"`; do

    BOOK_DIR=`dirname "${OPF_FILE}"`
    COMMAND="java -cp saxon-he-12.4.jar net.sf.saxon.Transform -s:\"${OPF_FILE}\" -xsl:transform.xsl"

    AZW_FILE=`find "${BOOK_DIR}" -name "*.azw[3]*"`
    EPUB_FILE=`find "${BOOK_DIR}" -name "*.epub"`
    MOBI_FILE=`find "${BOOK_DIR}" -name "*.mobi"`
    PDF_FILE=`find "${BOOK_DIR}" -name "*.pdf"`
    JPG_FILE=`find "${BOOK_DIR}" -name "*.jpg"`

    [ -n "${AZW_FILE}" ] && COMMAND+=" azw=\"${AZW_FILE/${LIBRARY_DIR}/}\"";
    [ -n "${EPUB_FILE}" ] && COMMAND+=" epub=\"${EPUB_FILE/${LIBRARY_DIR}/}\"";
    [ -n "${MOBI_FILE}" ] && COMMAND+=" mobi=\"${MOBI_FILE/${LIBRARY_DIR}/}\"";
    [ -n "${PDF_FILE}" ] && COMMAND+=" pdf=\"${PDF_FILE/${LIBRARY_DIR}/}\"";
    [ -n "${JPG_FILE}" ] && COMMAND+=" image=\"${JPG_FILE/${LIBRARY_DIR}/}\"";
    [ -n "${JPG_FILE}" ] && COMMAND+=" `identify -format 'width=%w height=%h' ${JPG_FILE}`"

    echo "$SEPARATOR"
    eval "${COMMAND}"
    SEPARATOR=","

done

echo ']}'