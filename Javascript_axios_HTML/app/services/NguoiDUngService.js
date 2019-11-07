function NguoiDungService() {
    // thêm người dùng vào bảng
    this.themNguoiDung = function (nguoiDung) {
        return axios({
            method: "POST",
            url: "http://5dbacb9f3ec5fb00143193f5.mockapi.io/api/NGUOIDUNG",
            data: nguoiDung
        });
    };

    this.layDanhSachNguoiDung = function () {
        /**Các giao thức trên API */
        // Get: lấy dsnd về
        // Post: thêm người dùng lên server
        // Put: giúp câpj nhật người dùng
        // Delete: xóa người dùng 

        return axios({
            method: "GET",
            url: "http://5dbacb9f3ec5fb00143193f5.mockapi.io/api/NGUOIDUNG" //đường link để lấy dữ liệu
        });
    };

    this.xoaNguoiDung = function (id) {
        return axios({
            method: "DELETE",
            url: `http://5dbacb9f3ec5fb00143193f5.mockapi.io/api/NGUOIDUNG/${id}`
        });
    };

    this.layThongTinNguoiDung = function (id) {
        return axios({
            method: "GET",
            url: `http://5dbacb9f3ec5fb00143193f5.mockapi.io/api/NGUOIDUNG/${id}`
        });
    };

    this.capNhatThongTin = function (id, nguoiDung) {
        return axios({
            method: "PUT",
            url: `http://5dbacb9f3ec5fb00143193f5.mockapi.io/api/NGUOIDUNG/${id}`,
            data: nguoiDung
        });
    };
    /**cách 1 */
    this.searchUser = function (chuoiTimKiem, mangNguoiDung) {
        //     /**
        //      * 1. tạo mảng rỗng mangTimKiem
        //      * 2. duyệt mảng người dùng
        //      * 3. use hàm indexOf để so sánh tương đối
        //      * 4. mangTimKiem thêm người dùng tìm thấy vào mảng là mảng tìm kiếm
        //      */

        //      var mangTimKiem = [];
        //      mangNguoiDung.map(function(item){
        //        if(item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1 ){
        //         mangTimKiem.push(item);
        //        }  
        //      });
        //      return mangTimKiem;

        /**cách 2: dùng filter để lọc danh sách người dùng */
        return mangNguoiDung.filter(function (item) {
            return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        });
    }

}
