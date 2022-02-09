### Link github
https://github.com/LocLinh/CS114.M11

## 1. Thu thập dữ liệu
   
Dữ liệu của nhóm phần lớn là ảnh chụp từ điện thoại và một phần từ Internet. Dữ liệu được phân chia thành 21 chủ đề khác nhau: Áo quần, bầu trời, bìa sách, biển, cây cối, ảnh chụp màn hình, điện thoại, đồ ăn, đồi núi, giày, hoa, hoá đơn, sông suối hồ, tài liệu, tòa nhà, xe cộ, người, selfie, đồng ruộng, đường phố và thú cưng. 

Ảnh chụp từ điện thoại gồm ảnh tự chụp và ảnh cung cấp bởi người thân và bạn bè. Ảnh lấy trên Internet từ nhiều nguồn khác nhau để bù vào những chủ đề có ít ảnh.

## 2. Phân tích dữ liệu

Mỗi chủ đề có số lượng ảnh dao động từ 251 đến 2841 ảnh. Các chủ đề như đường phố, người, áo quần có số lượng lớn hơn rất nhiều so với các chủ đề còn lại. Ảnh của chủ đề đường phố phần lớn được lấy từ video quay đường phố. Lượng dữ liệu thuộc hai chủ đề quần áo và người khá cao.

Sơ đồ thư mục dữ liệu sẽ có dạng như sau:
```
Data
├── Train
│ ├── Ao quan
│ │ ├── 00001.jpg
│ │ ├── 00002.jpg
│ │ └── ...
│ ├── Bau troi
│ ├── Bia sach
│ ├── ...
│ └── Xe co
└── Test
 ├── Ao quan
 │ ├── 0001.jpg
 │ ├── 0002.jpg
 │ └── ...
 ├── Bau troi
 ├── Bia sach
 ├── ...
 └── Xe co
```

Dataset được chia làm 2 phần train và test, với phần test có số lượng ảnh là đúng 50 ảnh lấy ngẫu nhiên cho mỗi chủ đề. Như vậy số lượng ảnh tập train là 11600 ảnh, và số lượng ảnh của tập test là 1050 ảnh. Các ảnh được đánh số từ 1 cho đến 11600 đối với tập train và 1050 đối với tập test.

Phần lớn ảnh được chụp từ điện thoại và có kích thước phần lớn nằm trong khoảng dưới 2000x2000. Nhóm đã chọn lọc và loại bỏ các dữ liệu có kích thước quá lớn vì khi train nhóm đã gặp phải lỗi Decompression Bomb Warning khi ảnh vượt quá kích cỡ cho phép (trên 89 478 485 pixel).
