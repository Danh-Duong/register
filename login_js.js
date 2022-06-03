var username=document.querySelector("#username");
var email=document.querySelector("#email");
var password=document.querySelector("#password");
var confirm=document.querySelector("#confirm");
var form=document.querySelector("form");
obj=[username, email, password, confirm];


setInterval(function(){
    document.querySelector("h1").classList.toggle("change_color");
},1000);


function showError(input, message){
    let parent=input.parentElement;
    let small= parent.querySelector("small");
    parent.classList.add("error");
    small.innerText=message;
};

function showSuccess(input){
    let parent=input.parentElement;
    let small= parent.querySelector("small");
    parent.classList.remove("error");
    small.innerText='';
};

function checkEmpty(listInput){
    let isEmptyError= false;
    listInput.forEach(input => {
        input.value = input.value.trim();
        if (!input.value){
            isEmptyError=true;
            showError(input, "Không được để trống");
        }
        else{
            showSuccess(input);
        }
    });
    return isEmptyError;

}

function checkEmalError(input){
    const regex =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value= input.value.trim();
    let isEmailError= !regex.test(input.value);
    if(regex.test(input.value)){
        showSuccess(input);
    }
    else{
        showError(input,"Không hợp lệ")
    }
    return isEmailError;
}


function checkLengthErr(input, min , max){
    input.value=input.value.trim();
    if (input.value.length < min){
        showError(input, `Phải có ít nhất ${min} ký tự`);
        return true;
    }
    if(input.value.length > max){
        showError(input, `Không được vượt quá ${max} kí tự`);
        return true;
    }

    return false;
}

function checkPass(pass, confirmpass){
    if (pass.value !== confirmpass.value){
        showError(confirmpass, "Mật khẩu không trùng khớp");
        return true;
    }
    return false;
}

form.addEventListener("submit", function(e){
    e.preventDefault();
    let isEmptyError=checkEmpty(obj);
    let isEmailError= checkEmalError(email);
    let isUsernameErr=checkLengthErr(username, 3, 15);
    let isPasswordErr=checkLengthErr(password, 3, 15);
    let isPassErr = checkPass(password, confirm); 

});

function checkblur(ele){
    if (ele.value.trim().length>0){
        ele.nextElementSibling.classList.add("add");
    }
    else{
        ele.nextElementSibling.classList.remove("add");
    }
}

username.addEventListener("blur",function(){
    checkblur(username);
    if (checkLengthErr(username, 3, 15)==false){
        showSuccess(username);
    }

});

email.addEventListener("blur", function(){
    checkblur(email);
    if (checkEmalError(email)==false){
        showSuccess(email);
    }
});

password.addEventListener("blur", function(){
    checkblur(password);
    if (checkLengthErr(password, 3, 15)==false){
        showSuccess(password);
    }
})

confirm.addEventListener("blur", function(){
    checkblur(confirm);
    if (er=checkPass(password, confirm) == false){
        showSuccess(confirm);
    }
})  