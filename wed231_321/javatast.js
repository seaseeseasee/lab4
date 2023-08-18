var product = [{
    id: 1,
    img: '/imag/อมยิ้ม1.jpg',
    name: 'Smiley candy',
    price: 900,
    description: 'อมยิ้มแท่งใหญ่ที่สามารถให้ความหวานแก่คุณได้เพียงพอ ทำมาจากน้ำตาลที่คัดสรรค์อย่างดี เหมาะสำหรับอากาศเย็นสบายของหน้าฝน',
    type: 'candy'
}, {
    id: 2,
    img: '/imag/เยลลี่.jpg',
    name: 'bear shaped jelly',
    price:700,
    description: 'เยลลี่รูปหมีที่ฮอตที่สุดในหมู่เด็กๆ อร่อยเคี้ยวหนึบ สามารถเคี้ยวเพลินๆยามไปเล่นกับเพื่อนหรือยามทำงานทั้งยังผลิตมาจากเจลลาตินธรรมชาติคุณภาพสูง เหมาะสำหรับทุกเพศทุกวัย',
    type: 'jelly'
}, {
    id: 3,
    img: '/imag/รสม.jpg',
    name: 'fruit flavored candy',
    price: 1000,
    description: 'ลูกอมรสผลไม้ ที่มีรสชาติหลากหลายให้คุณลิ้มลองได้ไม่มีเบื่อ ความหวานที่ได้จากน้ำตาลและผลไม้จึงกลมกล่อมอย่างที่สุด คุณสามารถดื่มด่ำกับรสชาติได้ทุกที่ทุกเวลา   พร้อมแล้วสำหรับการจำหน่ายเพื่อคุณ',
    type:'candy'
},{
    id: 4,
    img: '/imag/ลูกอม.jpg',
    name: 'Peppermint Candy',
    price: 800,
    description: 'ลูกอมเปปเปอร์มิ้นที่กินเข้าไปแล้วรู้สึกสดชื่และทำให้ร่างกายผ่อนคลาย เหมาะสำหรับการบรรเทาความร้อนของประเทศไทยได้เป็นอย่างดี',
    type: 'candy'
}];

// [{},{},{}] // length = 3

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                </div>`;
    }
    $("#productlist").html(html);

})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function searchsomething(elem) {
    // console.log('#'+elem.id)
    var value = $('#'+elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if( product[i].name.includes(value) ) {
            html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${ numberWithCommas(product[i].price) } THB</p>
                </div>`;
        }
    }
    if(html == '') {
        $("#productlist").html(`<p>Not found product</p>`);
    } else {
        $("#productlist").html(html);
    }

}

function searchproduct(param) {
    console.log(param)
    $(".product-items").css('display', 'none')
    if(param == 'all') {
        $(".product-items").css('display', 'block')
    }
    else {
        $("."+param).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text( numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}

function closeModal() {
    $(".modal").css('display','none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index ) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }

    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $("#cartcount").css('display','flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display','flex')
    rendercart();
}

function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}

function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}

function calculateTotalPrice() {
    let totalPrice = 0;
    for (let i = 0; i < cart.length; i++) {
        totalPrice += cart[i].price * cart[i].count;
    }
    
    const discountedTotalPrice = totalPrice * 0.9; // 10% discount
    return discountedTotalPrice;
}


function rendercart() {
    if (cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)} THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }

        const totalPrice = calculateTotalPrice();
        html += `<div class="cart-total">
                    <p>Total Price: ${numberWithCommas(totalPrice)} THB</p>
                </div>`;

        $("#mycart").html(html);
    } else {
        $("#mycart").html(`<p>Not found product list</p>`);
    }
}
function openAddressForm1() {
    $('#addressModal').css('display','flex');
  }
