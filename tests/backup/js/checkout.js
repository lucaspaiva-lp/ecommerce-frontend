export default function checkoutPage() {
  return `
    <section class="checkout">
      <h2>Checkout</h2>
      <form id="checkout-form">
        <div class="form-group">
          <label for="name">Nome Completo:</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group
">
          <label for="address">Endereço:</label>
          <input type="text" id="address" name="address" required>
        </div>
        <div class="form-group
">
          <label for="payment">Método de Pagamento:</label>
          <select id="payment" name="payment" required>
            <option value="">Selecione</option>
            <option value="credit-card">Cartão de Crédito</option>
            <option value="paypal">PayPal</option>
            <option value="boleto">Boleto Bancário</option>
          </select>
        </div>
        <button type="submit">Finalizar Compra</button>
        <div id="checkout-message" class="checkout-message"></div>
  }
});
    cartElement.classList.remove('open');
    alert('Redirecionando para a página de checkout...');
    // Aqui você pode implementar a lógica de checkout, como redirecionar para uma página de pagamento
  }
});
    e.preventDefault();
        </form>
    </section>
  `;
}