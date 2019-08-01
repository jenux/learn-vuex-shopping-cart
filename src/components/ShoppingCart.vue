<template>
    <div class="app-cart">
        <h2>Your Cart</h2>
        <p v-show="!products.length"><i>Cart is empty.</i></p>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{product.title}} - {{ product.price }} x {{product.quantity}}
                <br>
                <button
                    :disabled="product.quantity<1"
                    @click="decrementItemQuantity(product)">-</button>
                |
                <button
                    @click="incrementItemQuantity(product)">+</button>
                |
                <button
                    @click="deleteFromCart(product)">x</button>
            </li>
        </ul>
        <p>Total: {{total}}</p>
        <p><button 
            :disabled="!products.length" 
            @click="checkout(products)">Checkout</button></p>
        <p v-show="checkoutStatus">Checkout {{checkoutStatus}}</p>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
export default {
    computed: {
        ...mapState({
            checkoutStatus: state => state.cart.checkoutStatus
        }),
        ...mapGetters('cart', {
            products: 'cartProducts',
            total: 'totalPrice'
        })
    },
    methods: {
        // checkout (products) {
        //     this.$store.dispatch('cart/checkout', products)
        // }
        ...mapActions('cart', [
            'checkout',
            'deleteFromCart',
            'decrementItemQuantity',
            'incrementItemQuantity'
        ])
    }
}
</script>

