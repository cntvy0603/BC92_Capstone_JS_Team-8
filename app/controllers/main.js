import Product from "../models/product.js";
import Api from "../controllers/api.js";
import Validation from "../models/validation.js";

const validation = new Validation();
const api = new Api();
let productList = [];


const renderUI = (data) => {
  let content = "";

  data.forEach((product, index) => {
    content += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td class="product-img">
                <img src="${product.img}" alt="${product.name}" width="80" />
                </td>
                <td class="product-desc" title="${product.desc}">${product.desc}</td>
                <td>${product.type}</td>
                <td class="text-center align-middle button">
                <button class="btn btn-sm btn-info mb-2" data-toggle="modal" data-target="#myModal" onclick="handleEditProduct(${product.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="handleDeleteProduct(${product.id})">Delete</button>
                    
                </td>
            </tr>
        `;
  });

  document.getElementById("tblDanhSachSP").innerHTML = content;
};

const getListProducts = () => {
  document.getElementById("loader").style.display = "block";

  const promise = api.fetchProductsApi();

  promise
    .then((result) => {
      productList = result.data;
      renderUI(productList);

      document.getElementById("loader").style.display = "none";
    })
    .catch((error) => {
      console.log(error);
      document.getElementById("loader").style.display = "none";
    });
};

getListProducts();

const handleDeleteProduct = (id) => {
  const promise = api.deleteProductByIdApi(id);
  promise
    .then((rs) => {
      alert(`Xóa sản phẩm ${rs.data.name} thành công`);
      getListProducts();
    })
    .catch((error) => {
      console.log(error);
    });
};

window.handleDeleteProduct = handleDeleteProduct;

// Thêm SP
document.getElementById("btnThemSP").onclick = function () {
  const title = "Thêm sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  const footer = `
    <button class="btn btn-success" onclick="handleAddProduct()">Thêm sản phẩm</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
   
  document.getElementById("TenSP").value = "";
  document.getElementById("GiaSP").value = "";
  document.getElementById("ScreenSP").value = "";
  document.getElementById("BackCameraSP").value = "";
  document.getElementById("FrontCameraSP").value = "";
  document.getElementById("HinhSP").value = "";
  document.getElementById("MoTa").value = "";
  document.getElementById("LoaiSP").value = "";

 document.querySelectorAll(".invalid-form").forEach(errorDiv => {
  errorDiv.innerHTML = "";
  errorDiv.style.display = "none";
});
 
};

// Add SP
const handleAddProduct = () => {
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const screen = document.getElementById("ScreenSP").value;
  const backCamera = document.getElementById("BackCameraSP").value;
  const frontCamera = document.getElementById("FrontCameraSP").value;
  const img = document.getElementById("HinhSP").value;
  const desc = document.getElementById("MoTa").value;
  const type = document.getElementById("LoaiSP").value;

  let isValid = true;
    isValid &=
    validation.checkEmpty(name, "invalidTen", "Tên sản phẩm không được để trống") &&
    validation.checkLengthCharacter(
      name,
      "invalidTen",
      "Tên sản phẩm từ 6-50 ký tự",
      6,
      50
    )
;

    isValid &= validation.checkEmpty(
    price,
    "invalidGia",
    "Giá sản phẩm không được để trống"
  )&& validation.checkNumber(price, "invalidGia", "Giá phải là con số");;

     isValid &= validation.checkEmpty(
    screen,
    "invalidScreen",
    "Screen không được để trống"
  );

    isValid &= validation.checkEmpty(
    backCamera,
    "invalidBack",
    "Back Camera không được để trống"
  );

    isValid &= validation.checkEmpty(
    frontCamera,
    "invalidFront",
    "Front Camera không được để trống"
  );

    isValid &= validation.checkEmpty(
    img,
    "invalidImg",
    "Vui lòng thêm hình ảnh sản phẩm"
  );

    isValid &= validation.checkEmpty(
    type,
    "invalidLoai",
    "Loại không được để trống"
  );

    isValid &= validation.checkEmpty(
    desc,
    "invalidMoTa",
    "Vui lòng nhập mô tả"
  );
    
if (!isValid) return; 
  const product = new Product("", name, price, screen, backCamera, frontCamera, img, desc, type);

  const promise = api.addProductApi(product);
  promise
    .then((rs) => {
      alert(`Thêm sản phẩm ${rs.data.name} thành công`);
      getListProducts();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });


};
window.handleAddProduct = handleAddProduct;

// Edit SP
const handleEditProduct = (id) => {
  // Update Modal title
  const title = "Sửa sản phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  // Render button "Update Product"
  const footer = `
    <button class="btn btn-success" onclick="handleUpdateProduct(${id})">Cập nhật sản phẩm</button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

document.querySelectorAll(".invalid-form").forEach(errorDiv => {
  errorDiv.innerHTML = "";
  errorDiv.style.display = "none";
});
// Call Api
  const promise = api.getProductByIdApi(id);
  promise
    .then((result) => {
      const product = result.data;
      // Fill data to form
      document.getElementById("TenSP").value = product.name;
      document.getElementById("GiaSP").value = product.price;
      document.getElementById("ScreenSP").value = product.screen;
     document.getElementById("BackCameraSP").value = product.backCamera;
     document.getElementById("FrontCameraSP").value = product.frontCamera;
      document.getElementById("HinhSP").value = product.img;
      document.getElementById("MoTa").value = product.desc;
      document.getElementById("LoaiSP").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });

  
};
window.handleEditProduct = handleEditProduct;

// Update SP
const handleUpdateProduct = (id) => {
  // Lấy thông tin người dùng nhập từ form
  const name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const screen = document.getElementById("ScreenSP").value;
  const backCamera = document.getElementById("BackCameraSP").value;
  const frontCamera = document.getElementById("FrontCameraSP").value;
  const img = document.getElementById("HinhSP").value;
  const desc = document.getElementById("MoTa").value;
  const type = document.getElementById("LoaiSP").value;

  let isValid = true;
    isValid &=
    validation.checkEmpty(name, "invalidTen", "Tên sản phẩm không được để trống") &&
    validation.checkLengthCharacter(
      name,
      "invalidTen",
      "Tên sản phẩm từ 6-50 ký tự",
      6,
      50
    )
;

   isValid &= validation.checkEmpty(
    price,
    "invalidGia",
    "Giá sản phẩm không được để trống"
  )&& validation.checkNumber(price, "invalidGia", "Giá phải là con số");;

     isValid &= validation.checkEmpty(
    screen,
    "invalidScreen",
    "Screen không được để trống"
  );

    isValid &= validation.checkEmpty(
    backCamera,
    "invalidBack",
    "Back Camera không được để trống"
  );

    isValid &= validation.checkEmpty(
    frontCamera,
    "invalidFront",
    "Front Camera không được để trống"
  );

    isValid &= validation.checkEmpty(
    img,
    "invalidImg",
    "Vui lòng thêm hình ảnh sản phẩm"
  );

    isValid &= validation.checkEmpty(
    type,
    "invalidLoai",
    "Loại không được để trống"
  );

    isValid &= validation.checkEmpty(
    desc,
    "invalidMoTa",
    "Vui lòng nhập mô tả"
  );
    

if (!isValid) return; 

  const product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);

  const promise = api.updateProductByIdApi(product);
  promise
    .then((rs) => {
      alert(`Cập nhật sản phẩm ${rs.data.name} thành công`);
      getListProducts();
      // Đóng modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch((error) => {
      console.log(error);
    });

};
window.handleUpdateProduct = handleUpdateProduct;

// Tìm kiếm
document.getElementById("searchProduct").addEventListener("keyup", function () {
    const keyword = this.value.toLowerCase();
    const filteredList = productList.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );
    renderUI(filteredList);
});

// Sắp xếp SP theo giá tiền
function sortProducts() {
    const sortType = document.getElementById("sortSelect").value;
    let sortedList = [...productList]; // Copy array

    if (sortType === "asc") {
        sortedList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortType === "desc") {
        sortedList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    renderUI(sortedList);
}
window.sortProducts = sortProducts;








