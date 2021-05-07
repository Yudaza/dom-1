window.dom = {
    create(string) { //用来创建新节点
        const container = document.createElement("template")
        container.innerHTML = string.trim()//trim用来防止空格，导致抓取的children是text
        return container.content.firstChild//template的元素要这样拿到
    },
    after(node, node2) {  // 用来创建新弟弟
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2) {  //用来创建新哥哥
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {  //用来新增儿子
        parent.appendChild(node)
    },
    wrap(node, parent) {  //用来新增父级
        dom.before(node, parent) //先把新增节点插在节点之前，此时为兄弟
        dom.append(parent, node)  //再将节点变成新增节点的儿子
    },
    remove(node) {  //用来删除节点
        node.parentNode.removeChild(node)//IE兼容，node.remove() IE可能不支持
        return node
    },
    empty(node) {  //删除父级的所有子节点，node.innerHTML=''，但是为了保留引用，以下
        //const {childNodes} = node  //const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))  //等同于下面的缩写
            x = node.firstChild
        }
        //for (let i = 0; i < childNodes.length; i++) { 由于childNodes.length一直在改变所以不可
        //dom.remove(childNodes[i])
        //array.push(childNodes[i])
    },
    //attr(node,name,value){  //改title
    //node.setAttribute(name,value)
    //}
    attr(node, name, value) {  //用重载，读写title
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    //text(node, string) {  //用于读写文本内容
    //node.innerText = string //用于IE
    //}
    text(node, string) {  //用重载和适配，读写文本内容
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string
            } else {
                node.textContent = string
            }
        } else if (arguments === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {  //读写html
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    //style(node, object) {  //修改style
    //for (let key in object) {
    //node.style[key] = object[key]
    //}
    //}
    style(node, name, value) {  //读写style
        if (arguments.length === 3) {
            //可能的形式dom.style(div, 'color', 'red')是为修改style
            node.style[name] = value
        } else if (arguments.length === 2) {
            //dom.style(div, 'color')是为查询
            if (typeof name === 'string') {
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div, {color: 'red'})
                for (let key in name) {
                    node.style[key] = name[key]
                }
            }
        }
    },
    class: {  //class增删查
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {  //添加事件监听
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {  //删除事件监听
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {  //获取标签（们）
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {  //用于获取父元素
        return node.parentNode
    },
    children(node) {  //获取子元素
        return node.children
    },
    siblings(node) {  //查找兄弟姐妹，不包括自己
        Array.from(node.parentNode.children).filter(n => n !== node)//需要变成数组才能filter
    },
    next(node) {  //找到弟弟
        let x = node.nextSibling
        while (x && x.nodeType === 3) {  //由于会找到text所以要跳过
            x = x.nextSibling
        }
        return x
    },
    previous(node){  //找到哥哥
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList,fn){  //遍历节点
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null,nodeList[i])
        }
    },
    index(node){  //查询第几个节点
        const list=dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i]===node){
                break
            }
        }
        return i
    }


};