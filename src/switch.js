const switch_element = document.querySelector('#switch')
const switch_button = document.querySelector('.switch_button')
class Switcher {
    constructor( element, rgb, color){
        this.state = 'rgb'
        this.rgb = rgb
        this.color = color
        this.element = element
        this.__init__()
    }

    __init__ = ()=>{
        this.element.innerHTML = this.color
    }

    switch(){
        if(this.state == "rgb"){
            this.element.innerHTML = this.color;
            this.state = 'color'
        }else{
            this.element.innerHTML = this.rgb;
            this.state = 'rgb'
        }
    }
}

const rgb = `
        <li>
            <label for ='red'>Red:</label>
            <input name='red' class ='color-input red' type="number"  required min='0' max='255' placeholder="0-255"/>
        </li>
        <li>
            <label for ='green'>Green:</label>
            <input name='green'class ='color-input green' type="number"  required min='0' max='255'placeholder="0-255"/>
        </li>
        <li class=' border_bottom_none'>
            <label for ='blue'>Blue:</label>
            <input name='blue' class ='color-input blue' type="number"  required min='0' max='255' placeholder="0-255"/>
        </li>
`
const color = `
        <li class ='border_bottom_none' >
            <label for ='color_select'>Select Color</label>
            <input name='color_select' class ='color-input color_select ' type="color"  required"/>
        </li>`


const switcher = new Switcher(switch_element, rgb, color)

switch_button.addEventListener('click', (e)=>{
    e.preventDefault()
    switcher.switch()
})
        
        
        