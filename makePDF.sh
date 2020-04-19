if [[ -d "$1" ]]
then
	echo ./lib/hocr-pdf.py "$1"
    ./lib/hocr-pdf.py "$1" > "$1".new.pdf
else
    echo "Provided argument is not a directory"
fi