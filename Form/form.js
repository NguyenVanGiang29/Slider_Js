function Validator(validate) {
  var formElement = document.querySelector(validate.form);
  var submitButton = document.querySelector(".form-submit");

  var selectorRules = {};

  var valueInput = new Map();

  function valiDate(inputElement, rule) {
    var errorElement = inputElement.parentElement.querySelector(
      validate.errorSelector
    );
    var errorMess;
    var rules = selectorRules[rule.selector];
    for (let i = 0; i < rules.length; i++) {
      errorMess = rules[i](inputElement.value);
      if (errorMess) break;
    }
    if (errorMess) {
      submitButton.disabled = true;
      errorElement.innerText = errorMess;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
      if (valueInput.size < 3) {
        valueInput.set(rule.selector ,inputElement.value);
        console.log(valueInput);
        console.log(valueInput.size);
        submitButton.disabled = true;
      } else {
        submitButton.disabled = false;
      }
    }
  }

  if (formElement) {
    // Khi submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();
      alert("Đăng ký thành công");
    };
    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input)
    validate.rules.forEach((rule) => {
      // Lưu lại các rule cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        inputElement.onblur = function () {
          valiDate(inputElement, rule);
        };

        inputElement.oninput = function () {
          var errorElement =
            inputElement.parentElement.querySelector(".form-message");
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
          if (valueInput.size == 3) {
            submitButton.disabled = false;
          }
        };
      }
    });
  }
}

function removeAscent(str) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập trường này";
    },
  };
};

Validator.specCharacter = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^[a-zA-Z ]{2,}$/g;
      return regex.test(removeAscent(value))
        ? undefined
        : message || "Tên không chứa ký tự đặc biệt";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(value)
        ? undefined
        : message || "Trường này phải là email";
    },
  };
};

Validator.isLength = function (selector, min, max, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min && value.length <= max
        ? undefined
        : message || `Độ dài mật khẩu tối thiếu ${min} ký tự - ${max} ký tự`;
    },
  };
};

Validator.isConfirmed = function (selector, getCofirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getCofirmValue()
        ? undefined
        : message || "Giá trị nhập vào không chính xác";
    },
  };
};

Validator.specCharacterPass = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /^(?=.*[A-Z])(?=.*[a-z])/g;
      return regex.test(value)
        ? undefined
        : message ||
            "Mật khẩu phải có ít nhất 1 ký tự thường, 1 ký tự viết hoa";
    },
  };
};
