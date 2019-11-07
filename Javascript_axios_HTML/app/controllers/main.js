var nguoiDUngService = new NguoiDungService();

function themTestGit(){
    console.log("Them nguoi dung aanht2");
}

getListUser();
getEle("btnThemNguoiDung").addEventListener("click", function(){
    var title = "Them Nguoi Dung";
    var footer = `
    <button class="btn btn-success" onclick="themNguoiDung()">Them</button>
    `
    document.getElementsByClassName("modal-title")[0].innerHTML = title;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

// Thêm người dùng
function themNguoiDung(){
    // console.log(123);
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    // console.log(nguoiDung);

    nguoiDUngService.themNguoiDung(nguoiDung)
        .then(function(result){
            console.log(result);
            getListUser();
            // location.reload(); để mỗi lần nhập thêm 1 thông tin thì tự đông reload lại infor
        })
        .catch(function(error){
            console.log(error);
        })
}

function renderTable(mangNguoiDung){
    var contentHTML = "";
    // duyệt mảng bằng map
    mangNguoiDung.map(function(item, index){
        contentHTML += `
        <tr> 
        <td>${index + 1}</td>
        <td>${item.taiKhoan}</td>
        <td>${item.matKhau}</td>
        <td>${item.hoTen}</td>
        <td>${item.email}</td>
        <td>${item.soDT}</td>
        <td>${item.maLoaiNguoiDung}</td>
        <td>
        <button class= "btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${item.id})">Sửa</button>
        <button class= "btn btn-danger" onclick="xoa(${item.id})">Xóa</button>
        </td>
       
        </tr>
        `
    });
    getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}

function getListUser(){
    nguoiDUngService.layDanhSachNguoiDung()
      // xem nó như 1 lời hứa có then(thực hiện đc), catch( không thực hiện được)
      .then(function(result){ 
        // console.log(result.data);
        setLocalStorage(result.data);
        renderTable(result.data);
    })
    .catch(function(error){
        console.log(error);
    });
}

// Lưu mảng người dùng xuống localStorage
function setLocalStorage(mangNguoiDung){
    localStorage.setItem("DanhSachNguoiDung",JSON.stringify(mangNguoiDung));
}

// lấy mảng thông tin người dùng từ localStorage
function getLocalStorage(){
    if(localStorage.getItem("DanhSachNguoiDung")){
       return JSON.parse(localStorage.getItem("DanhSachNguoiDung"));
    }
}

//chức năng xóa
function xoa(id){
    console.log(id);
    nguoiDUngService.xoaNguoiDung(id)
        .then(function(result){
            console.log(result);
            getListUser(); //auto cập nhật lại cái bảng sao khi update data
        })
        .catch(function(error){
            console.log(error);
            if(error.response.status === 404){
                alert("Mã người dùng sai rồi");
            }
        })
}
// chức năng sửa
function sua(id){
    console.log(id);
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";

    var footer = `
    <button class="btn btn-success" onclick="capNhat(${id})">Cập nhật</button>
    `
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    
// chức năng lấy thông tin người dùng
    nguoiDUngService.layThongTinNguoiDung(id)
        .then(function(result){
            console.log(result);
            getEle("TaiKhoan").setAttribute("disabled", true); //để không sửa được tài khoản
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(function(error){
            console.log(error);
        });
}
// cập nhật
function capNhat(id){
    console.log(id);
    var taiKhoan = getEle("TaiKhoan").value;
    var hoTen = getEle("HoTen").value;
    var matKhau = getEle("MatKhau").value;
    var email = getEle("Email").value;
    var soDT = getEle("SoDienThoai").value;
    var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, maLoaiNguoiDung);
    // console.log(nguoiDung);
    nguoiDUngService.capNhatThongTin(id,nguoiDung)
        .then(function(result){
            console.log(result);
            getListUser();
        })
        .catch(function(error){
            console.log(error);
        })

}
// chức năng tìm kiếm tên người dùng
/**cách 1 */
getEle("txtSearch").addEventListener("keyup", function(){
    var chuoiTimKiem = getEle("txtSearch").value;
    console.log("test hiển thị");
    var mangNguoiDung = getLocalStorage();
    console.log(mangNguoiDung);
   var mangTimKiem = nguoiDUngService.searchUser(chuoiTimKiem, mangNguoiDung);
   renderTable(mangTimKiem);
});


function getEle(id){
    return document.getElementById(id);
}