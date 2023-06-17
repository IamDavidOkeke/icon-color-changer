class ColorChanger {
    constructor(formID, fileInputID, canvasID, anchorID){
        this.form = document.querySelector(formID)
        this.fileInput = document.querySelector(fileInputID)
        this.anchor = document.querySelector(anchorID)
        this.canvas = document.querySelector(canvasID)
        this.context = this.canvas.getContext('2d')
        this.__init__()
    }


    __init__ = ()=>{
       this.form.addEventListener('submit', this.formHandler)
       this.fileInput.addEventListener('change', this.fileInputHandler)
    }

    fileInputHandler = (e)=>{
        if(e.target.files[0]){
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
        let inputs = document.querySelectorAll('.color-input')
        let arrInputs = Array.from(inputs)
        let color = {}
        for (var input of arrInputs){
            color[input.name] = input.value
        }

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
    }
}

const colorChanger = new ColorChanger('#form', '#fileinput', '#canvas', '#download')