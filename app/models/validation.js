export default class Validation {
  checkEmpty(value, divId, mess) {
    if (value === "") {
      document.getElementById(divId).innerHTML = mess;
      document.getElementById(divId).style.display = "block";
      return false; 
    }

    document.getElementById(divId).innerHTML = "";
    document.getElementById(divId).style.display = "none";
    return true;
  }

  checkCharacter(value, divId, mess) {
    const letter =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(letter)) {
      // hợp lệ
      document.getElementById(divId).innerHTML = "";
      document.getElementById(divId).style.display = "none";
      return true;
    }

    // không hợp lệ
    document.getElementById(divId).innerHTML = mess;
    document.getElementById(divId).style.display = "block";
    return false;
  }

  checkLengthCharacter(value, divId, mess, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      document.getElementById(divId).innerHTML = "";
      document.getElementById(divId).style.display = "none";
      return true;
    }

    document.getElementById(divId).innerHTML = mess;
    document.getElementById(divId).style.display = "block";
    return false;
  }

  checkNumber(value, divId, mess){
    const number = /^[0-9]+$/;
    if(number.test(value)){
        document.getElementById(divId).innerHTML = "";
        document.getElementById(divId).style.display = "none";
        return true;
    }
        document.getElementById(divId).innerHTML = mess;
        document.getElementById(divId).style.display = "block";
        return false;
    }

  checkExistId(value, divId, mess, arr) {
    let exist = false;

    for (let i = 0; i < arr.length; i++) {
      const food = arr[i];
      if (food.id === value) {
        exist = true;
        break;
      }
    }

    if (exist) {
      // không hợp lệ
      document.getElementById(divId).innerHTML = mess;
      document.getElementById(divId).style.display = "block";
      return false;
    }

    document.getElementById(divId).innerHTML = "";
    document.getElementById(divId).style.display = "none";
    return true;
  }
}

