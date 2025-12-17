<template>
  <h1>Simple CRUD App</h1>

  <input v-model="name" placeholder="New item" />
  <button @click="addItem">Add</button>

  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
      <button @click="deleteItem(item.id)">X</button>
    </li>
  </ul>
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
