insert into public.user (id, name, email, password, birthday, balance, lastname)
values  (1, 'Marjolaine', 'Arely_Howe30@yahoo.com', '91e84c5113bdb945.6a30adb6ec17f084f642f3a8c5c692e20d43887e049933828dbf9a46fc44bdb2', '2023-09-15', 10000, 'Torp'),
        (2, 'Rae', 'Heather57@hotmail.com', 'e23ecf34f1a407b0.c6284afe03d031d645eb47f4b6957f21208592496517cef826bdf29cbee17a9f', '2023-09-15', 10000, 'Boehm'),
        (3, 'Owen', 'Darius.Fritsch91@gmail.com', 'c0535609fe7b528c.0eb9af0863f9498a65f79e59c965957555231dd9cb63826bc68d2e0454c65f72', '2023-09-15', 10000, 'Cummerata');

insert into public.role (id, role)
values  (1, 'USER'),
        (2, 'ADMIN');

insert into public.user_roles_role ("userId", "roleId")
values  (1, 1),
        (2, 1),
        (3, 1),
        (1, 2);

insert into public.product (id, title, short, long, quantity, price, image)
values  (1, 'Gold', 'policy', 'Saudi Arkansas Investor', 244, 266, 'uploads/1066017958fa07ef3a12e11ae26d2964'),
        (2, 'Computer Wooden Rupee', 'payment transmitting directional District', 'Cheese digital back-end', 91, 390, 'uploads/d681e1b43f316aae9b35d4d8d617cfdd'),
        (4, 'withdrawal Robust Movies', 'Dalasi Tonga HTTP Integration Practical', 'Wooden Delaware index - Table Proactive Bike', 39, 158, 'uploads/ba88157e4077e79d7213fff007559c88');

insert into public.category (id, name)
values  (1, 'T-shirt'),
        (2, 'Jeans'),
        (3, 'Shorts'),
        (4, 'Dress');

insert into public.product_categories_category ("productId", "categoryId")
values  (1, 1),
        (1, 2),
        (1, 3),
        (2, 4),
        (2, 2),
        (2, 3),
        (4, 4),
        (4, 3),
        (4, 1);

insert into public.comment (id, comment, "userId", "productId")
values  (1, 'overriding Vista emulation', 1, 1),
        (2, 'virtual enterprise', 1, 1),
        (3, 'Home Liaison Dynamic Configuration', 1, 1),
        (4, 'user-centric Shilling invoice', 1, 2),
        (5, 'invoice approach Mission Hat', 1, 2),
        (6, 'calculating paradigm Progressive Dynamic Branding', 1, 4),
        (7, 'state Romania Phased', 1, 4);