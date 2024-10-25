console.log('Hello, DOM!')

function printDOMTree() {

    for (var i = 0; i < document.childNodes.length; i++) {
        var child = document.childNodes[i]

        if (child instanceof DocumentType) continue

        console.log(0, child.nodeName)

        for (var j = 0; j < child.childNodes.length; j++) {
            var child2 = child.childNodes[j]

            if (child2 instanceof Text) continue

            console.log(1, '  child2.nodeName')

            for (var k = 0; k < child2.childNodes.length; k++) {
                var child3 = child2.childNodes[k]

                if (child3 instanceof Text) continue

                console.log(2, '   child3.nodeName')

                for (var l = 0; l < child3.childNodes.length; l++) {
                    var child4 = child3.childNodes[l]

                    if (child4 instanceof Text) continue

                    console.log(3, '    child4.nodeName')

                    for (var n = 0; n < child4.childNodes.length; n++) {
                        var child5 = child4.childNodes[n]

                        if (child5 instanceof Text) continue

                        console.log(4, '    ', child5.nodeName)

                        for (var q = 0; q < child5.childNodes.length; q++) {
                            var child6 = child5.childNodes[q]

                            if (child6 instanceof Text) continue

                            console.log(5, '     child6.nodeName')

                            for (var x = 0; x < child6.childNodes.length; x++) {
                                var child7 = child6.childNodes[x]

                                if (child7 instanceof Text) continue

                                console.log(6, '     child7.nodeName')

                            }

                        }
                    }
                }
            }
        }
    }
}

printDOMTree()


