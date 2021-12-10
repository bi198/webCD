import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      id: "1",
      name: "bi",
      email: "bbgk198@gmail.com",
      // password: bcrypt.hashSync("123", 8),
      password:"12345678",
      isAdmin: true,
    },
    {
     id: "2",
      name: "user",
      email: "user@gmail.com",
      // password: bcrypt.hashSync("123", 8),
      password:"12345678",
      isAdmin: false,
    },
     {
     id: "3",
      name: "User1",
      email: "user@gmail.com",
      password:"123456789",
      isAdmin: false,
    },
     {
      id: "4",
      name: "bii",
      email: "bbgk1988@gmail.com",
      password: bcrypt.hashSync("123456789", 8),
      // password:"12345678"
      isAdmin: true,
    },
  ],
  products: [
    {
      id: "1",
      name: "Shirt 1",
      image: "imagies/img1.jpg",
      price: 10,
      brand: "Nike",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",
      rating: 4.5,
      numReviews: 10,
      countInStock: 10,
    },
    {
      id: "2",
      name: "Shirt 2",
      image: "imagies/img1.jpg",
      price: 20,
      brand: "Adidas",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",

      rating: 4.5,
      numReviews: 10,
      countInStock: 10,
    },
    {
      id: "3",
      name: "Shirt 3",
      image: "imagies/img1.jpg",
      price: 30,
      brand: "Puma",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",

      rating: 4.5,
      numReviews: 10,
      countInStock: 10,
    },
    {
      id: "4",
      name: "Shirt 3",
      image: "imagies/img1.jpg",
      price: 30,
      brand: "Puma",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",

      rating: 4.5,
      numReviews: 10,
      countInStock: 10,
    },
    {
      id: "5",
      name: "Shirt 5",
      image: "imagies/img1.jpg",
      price: 50,
      brand: "Puma",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic",

      rating: 4.5,
      numReviews: 10,
      countInStock: 10,
    },
  ],
};
export default data;
