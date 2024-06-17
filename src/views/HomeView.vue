<template>
  <div>
    <table class="styled-table">
      <thead>
        <tr>
          <th>Product ID</th>
          <th>Types</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Capacity</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products.data" :key="product.product_id">
          <td>{{ product.product_id }}</td>
          <td>{{ product.types }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.model }}</td>
          <td>{{ product.capacity }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <button class="px-4 py-2 mr-4 bg-indigo-600 hover:bg-indigo-800 rounded text-white" @click="prevPage" :disabled="!products.prev_page_url">Previous</button>
    <button class="px-4 py-2 mr-4 bg-indigo-600 hover:bg-indigo-800 rounded text-white" @click="nextPage" :disabled="!products.next_page_url">Next</button>
  </div>

  <div class="pt-5">
    <input type="file" @change="onFileChange">
    <button class="px-4 py-2 mr-4 bg-indigo-600 hover:bg-indigo-800 rounded text-white" @click="uploadFile" :disabled="file == null" >Upload</button>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: {},
      page: 1,
      file: null,
    };
  },
  methods: {
    fetchProducts() {
      axios.get(`http://rest-api/api/v1/products?page=${this.page}`).then(response => {
        this.products = response.data;
      });
    },
    nextPage() {
      if (this.products.next_page_url) {
        this.page++;
        this.fetchProducts();
      }
    },
    prevPage() {
      if (this.products.prev_page_url) {
        this.page--;
        this.fetchProducts();
      }
    },

    onFileChange(e) {
      this.file = e.target.files[0];
    },
    uploadFile() {
      let formData = new FormData();
      formData.append('file', this.file);

      axios.post('http://rest-api/api/v1/products/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(response => {
        alert('File uploaded successfully.');
      }).catch(error => {
        console.error(error);
      });
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style>
.styled-table {
  border-collapse: collapse;
  width: 100%;
}
.styled-table th, .styled-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.styled-table th {
  background-color: #f2f2f2;
}
</style>
