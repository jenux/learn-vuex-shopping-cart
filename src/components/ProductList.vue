<template>
    <div class="app-products">
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{product.price}}
                <br>
                <button
                    :disabled="!product.inventory"
                    @click="addToCart(product)">
                    Add to cart
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    computed: mapState({
        products: state => state.products.all
    }),
    created () {
        this.$store.dispatch('products/getAllProducts')
    },
    methods: mapActions('cart', [
        'addToCart'
    ])
}
</script>
