function Validator(options) {
    // hàm thực hiện validate
    function validate(inputElement, rule){
        let errorMessage
        let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        // value: inputElement
        // test func: rule.test

        // lấy rule trong danh sách
        // điều kiện nào k đúng thì được in ra và break
        let rules = selectorRules[rule.selector]
        for(let i = 0; i< rules.length ; ++i){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break
        }


        // muon lay the span thi` lấy cha của input rồi tìm class form-message
        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        }else {
            errorElement.innerText =''
            inputElement.parentElement.classList.remove('invalid')
            
        }

        return !errorMessage
    }
    
    let formElement  = document.querySelector(options.form)
    let selectorRules = {}
    // lấy element của form cần validate
    if(formElement) {
        formElement.onsubmit = (e)=>{
            e.preventDefault()

            let isFormValid = true

            options.rules.forEach((rule)=>{
                let inputElement = formElement.querySelector(rule.selector)
                let isValid = validate(inputElement, rule)
                if (!isValid){
                    isFormValid = false
                }
            })

            
            if (isFormValid){

                //Truong hop submit voi JS
                if (typeof options.onSubmit === 'function') {
                    let enableInput = formElement.querySelectorAll('[name]')
                               // console.log(enableInput)
                    let formValue = Array.from(enableInput).reduce((values, input)=>{
                        return (values[input.name] = input.value) && values
                    }, {})
                    
                    options.onSubmit(formValue)
                }else{
                    //submit mac dinh
                    formElement.submit()
                }
                
                
            }
        }


        // xử lý lặp qua các rules, lắng nghe sự kiện
        options.rules.forEach((rule)=>{
            let inputElement = formElement.querySelector(rule.selector)
            let errorElement = inputElement.parentElement.querySelector(options.errorSelector)
            
            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test)
            }else{
                selectorRules[rule.selector] = [rule.test]
            }
            

            if(inputElement) {
                // xử lí khi blur ra ngoài
                inputElement.onblur = function() {                  
                    validate(inputElement, rule)
                }

                //xử lí khi người dùng nhập vào input
                inputElement.oninput = ()=>{
                    errorElement.innerText =''
                    inputElement.parentElement.classList.remove('invalid')
        
                }
            }
        }) 
        
    }
}
// Nguyen tac cua cac rules:
// 1. khi co loi => tra ra mesae loi
// 2. khi hop le =? khong tra ra gi
Validator.isRequired = (selector, message)=> {
    return {
        selector: selector,
        test: (value)=> {
            return value.trim() ? undefined : message
        }
    }
}
Validator.isEmail = (selector,message)=> {
    return {
        selector: selector,
        test: (value)=> {
            let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regEmail.test(value) ? undefined : message
        }
    }
}
Validator.minLength = (selector, min)=> {
    return {
        selector: selector,
        test: (value)=> {
            return value.length >= min ? undefined : `*Mật khẩu có ít nhất  ${min} kí tự`
        }
    }
}
Validator.isConfirmation = (selector, getConfirmValue, message)=>{
    return {
        selector: selector,
        test: (value)=>{
            return value === getConfirmValue() ? undefined : message||'Giá trị nhập vào không chính xác'
        }
    }
}