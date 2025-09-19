let panier = [];
let total = 0;

// Ajouter un produit
function ajouterAuPanier(nom, prix) {
    panier.push({ nom, prix });
    total += prix;
    afficherPanier();
}

// Afficher le panier
function afficherPanier() {
    const liste = document.getElementById("liste-panier");
    liste.innerHTML = "";
    panier.forEach((p, index) => {
        const li = document.createElement("li");
        li.textContent = `${p.nom} - ${p.prix.toFixed(2)} $`;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => supprimerProduit(index);

        li.appendChild(btn);
        liste.appendChild(li);
    });
    document.getElementById("total").textContent = total.toFixed(2);
}

// Supprimer un produit
function supprimerProduit(index) {
    total -= panier[index].prix;
    panier.splice(index, 1);
    afficherPanier();
}

// Bouton PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: { value: total.toFixed(2) }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert("Merci pour votre achat, " + details.payer.name.given_name + " !");
            panier = [];
            total = 0;
            afficherPanier();
        });
    }
}).render('#paypal-button-container');
