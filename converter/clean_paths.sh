#!/bin/bash

LIBRARY_DIR=$1

DEBUG=

if [ -z "$LIBRARY_DIR" ]; then
    echo "Supply a Library Folder"
    exit -1;
fi

function debug() {
    [[ -n ${DEBUG} ]] && echo $1
}

function cleanup() {
    local FULL_PATH="$1"

    local BASE_NAME=`basename "${FULL_PATH}"`
    local DIR_NAME=`dirname "${FULL_PATH}"`

    local CLEAN_BASE_NAME=`echo "${BASE_NAME}" | sed -e 's/([0-9]\+)//g' -e 's/[^a-zA-Z0-9.]\+/_/g' -e 's/_$//'`

    if [ -d "${FULL_PATH}" ]; then
        CLEAN_BASE_NAME=${CLEAN_BASE_NAME/./}
    fi

    if [ "${BASE_NAME}" != "${CLEAN_BASE_NAME}" ]; then
        mv "${FULL_PATH}" "${DIR_NAME}/${CLEAN_BASE_NAME}"
    fi
}

function process_directory() {
    local FULL_PATH="$1"

    debug "IN ${FULL_PATH}"

    for f in `ls "${FULL_PATH}"`; do
        local PATH_TO_PROCESS="${FULL_PATH}/$f"

        debug "CHECK ${PATH_TO_PROCESS}"

        if [ -d "${PATH_TO_PROCESS}" ]; then 
            debug "DESCEND INTO ${PATH_TO_PROCESS}"
            process_directory "${PATH_TO_PROCESS}"
            debug "ASCEND FROM ${PATH_TO_PROCESS}"
        fi

        debug "CLEANUP ${PATH_TO_PROCESS}"
        cleanup "${PATH_TO_PROCESS}"
    done
}


OLD_IFS=${IFS}
IFS=$'\n'

process_directory "${LIBRARY_DIR}"