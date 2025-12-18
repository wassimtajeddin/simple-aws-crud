<template>
  <div class="container">
    <h1>Simple CRUD App</h1>

    <div class="form">
      <input v-model="name" placeholder="New item" />
      <button @click="addItem">Add</button>
    </div>

    <ul>
      <li v-for="item in items" :key="item.id">
        <span>{{ item.name }}</span>
        <button class="delete" @click="deleteItem(item.id)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      name: ""
    }
  },
  mounted() {
    this.fetchItems()
  },
  methods: {
    async fetchItems() {
      const res = await fetch("http://localhost:3000/api/items")
      this.items = await res.json()
    },
    async addItem() {
      if (!this.name) return
      await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: this.name })
      })
      this.name = ""
      this.fetchItems()
    },
    async deleteItem(id) {
      await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE"
      })
      this.fetchItems()
    }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f4f6f8;
}

.container {
  max-width: 500px;
  margin: 60px auto;
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 14px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #2563eb;
  color: white;
}

button:hover {
  background: #1d4ed8;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 8px;
  border-bottom: 1px solid #eee;
}

.delete {
  background: #ef4444;
}

.delete:hover {
  background: #dc2626;
}
</style>