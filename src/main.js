const div = dom.create("<div>newDiv</div>")
console.log(div)
dom.after(test, div)

const div3 = dom.create('<div id="parent"></div>')
dom.wrap(test, div3)

const nodes = dom.empty(window.empty)
console.log(nodes)

//dom.attr(test, 'title', 'Hi, I am YDZ') //改写title

const title = dom.attr(test, 'title')  //用来读title
console.log(`title: ${title}`)

dom.text(test, 'hello, this is the new content')//修改文本内容
dom.text(test)//读取文本

dom.style(test, {border: '1px solid red', color: 'blue'})//添加样式
dom.style(test, 'border')
dom.style(test, 'border', '1px solid red')

dom.class.add(test, 'red')

dom.on(test, 'click', () => {
    console.log('点击了')
})

const testDiv = dom.find('#test')[0]
console.log(testDiv)

console.log(dom.parent(test))

const t= dom.find('#travel')[0]
dom.each(dom.children(t),(n)=>dom.style(n,'color','red'))//遍历并且加颜色
