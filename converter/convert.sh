#!/bin/bash

LIBRARY_DIR=$1
DEST_DIR=$2

if [ -z "$LIBRARY_DIR" ]; then
    echo "Supply a Library Folder"
    exit -1;
elif [ "${LIBRARY_DIR:(-1)}" == "/" ]; then
    LIBRARY_DIR=${LIBRARY_DIR:0:${#LIBRARY_DIR}-1}
fi

if [ -n "$DEST_DIR" -a "${DEST_DIR:(-1)}" == "/" ]; then
    DEST_DIR=${DEST_DIR:0:${#DEST_DIR}-1}
fi

OLD_IFS=${IFS}
IFS=$'\n'

echo '{ "books": ['

SEPARATOR=""

for OPF_FILE in `find "${LIBRARY_DIR}" -name "*.opf"`; do

    BOOK_DIR=`dirname "${OPF_FILE}"`
    CLEAN_ROOT_DIR=${LIBRARY_DIR}

    if [ -n "$DEST_DIR" ]; then
        PUBDATE=$(grep '<dc:date' "${OPF_FILE}" | sed 's/.*<dc:date>\([0-9]*\)-.*/\1/')
        PUBDATE="${PUBDATE:-0}"

        if [ $PUBDATE -lt 1700 ]; then
            PUBDATE="unknown"
        fi

        BOOK_DIRNAME=$(basename "${BOOK_DIR}")
        PUBDATEDIR="${DEST_DIR}/${PUBDATE}"
        BOOK_DIRNAME_NEW=${BOOK_DIRNAME%% (*}

        mkdir -p "${PUBDATEDIR}"
        mv "${BOOK_DIR}" "${PUBDATEDIR}/${BOOK_DIRNAME_NEW}"

        OPF_FILE="${PUBDATEDIR}/${BOOK_DIRNAME_NEW}/$(basename "${OPF_FILE}")"
        BOOK_DIR=`dirname "${OPF_FILE}"`
        CLEAN_ROOT_DIR=${DEST_DIR}
    fi

    COMMAND="java -cp saxon-he-12.4.jar net.sf.saxon.Transform -s:\"${OPF_FILE}\" -xsl:transform.xsl"

    AZW_FILE=`find "${BOOK_DIR}" -name "*.azw[3]*"`
    EPUB_FILE=`find "${BOOK_DIR}" -name "*.epub"`
    MOBI_FILE=`find "${BOOK_DIR}" -name "*.mobi"`
    PDF_FILE=`find "${BOOK_DIR}" -name "*.pdf"`
    JPG_FILE=`find "${BOOK_DIR}" -name "*.jpg"`

    [ -n "${AZW_FILE}" ] && COMMAND+=" azw=\"${AZW_FILE/${CLEAN_ROOT_DIR}/}\"";
    [ -n "${EPUB_FILE}" ] && COMMAND+=" epub=\"${EPUB_FILE/${CLEAN_ROOT_DIR}/}\"";
    [ -n "${MOBI_FILE}" ] && COMMAND+=" mobi=\"${MOBI_FILE/${CLEAN_ROOT_DIR}/}\"";
    [ -n "${PDF_FILE}" ] && COMMAND+=" pdf=\"${PDF_FILE/${CLEAN_ROOT_DIR}/}\"";
    [ -n "${JPG_FILE}" ] && COMMAND+=" image=\"${JPG_FILE/${CLEAN_ROOT_DIR}/}\"";
    [ -n "${JPG_FILE}" ] && COMMAND+=" `identify -format 'width=%w height=%h' ${JPG_FILE}`"

    echo "$SEPARATOR"
    eval "${COMMAND}"
    SEPARATOR=","

done

echo ']}'