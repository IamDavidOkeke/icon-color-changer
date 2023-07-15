class ColorChanger {
    constructor(formID, fileInputID, canvasID, anchorID){
        this.form = document.querySelector(formID)
        this.fileInput = document.querySelector(fileInputID)
        this.anchor = document.querySelector(anchorID)
        this.canvas = document.querySelector(canvasID)
        this.context = this.canvas.getContext('2d')
        this.imageName = ''
        this.__init__()
    }


    __init__ = ()=>{
       this.form.addEventListener('submit', this.formHandler)
       this.fileInput.addEventListener('change', this.fileInputHandler)
    }

    fileInputHandler = (e)=>{
        if(e.target.files[0]){
            this.imageName = e.target.files[0].name
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = (e)=>{
                let image = document.createElement('img')
                image.src = e.target.result
                image.onload = (e)=>{
                    this.canvas.width = image.width
                    this.canvas.height = image.height
                    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height)
                }
            }
        }
    }

    formHandler = (e)=>{
        e.preventDefault()
        let select = document.querySelector('.color_select')
        let inputs = document.querySelectorAll('.color-input')
        let color = {}
        if(select){
            let value = select.value
            color.red = parseInt(value.substring(1,3), 16)
            color.green = parseInt(value.substring(3,5), 16)
            color.blue = parseInt(value.substring(5), 16)
        }else{
            let arrInputs = Array.from(inputs)
            for (var input of arrInputs){
                color[input.name] = input.value
            }
        }
        console.log(color)
        let data = this.getImageData()
        console.log('data', data)
        for(let i = 0; i < data.data.length; i+=4){
            data.data[i] = color.red
            data.data[i+1] = color.green
            data.data[i+2] = color.blue
        }
        this.putImageData(data)
        this.setAnchor()
    }

    getImageData = ()=>{
       return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }

    putImageData = (data)=>{
        return this.context.putImageData(data, 0, 0)
     }


    
    setAnchor = ()=>{
        this.anchor.href = this.canvas.toDataURL()
        this.anchor.classList.remove('inactive')
        this.anchor.download = 'modified_'+ this.imageName 
    }
}

const colorChanger = new ColorChanger('#form', '#fileinput', '#canvas', '#download')