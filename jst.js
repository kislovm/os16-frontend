window.JST = {};

window.JST['popup'] = _.template(
    '<div class="popup"> \
        <div class="popup__content"> \
        </div> \
    </div>'
)

window.JST['orders/head'] = _.template('<table cellspacing="0" cellpadding="0" border="0"> \
                             <tbody> \
                              <tr> \
                               <td> \
                                <table class="header"> \
                                    <tbody> \
                                        <tr> \
                                            <td class="left-from-header"> </td><td class="header">Поставщик</td><td class="counter-green"><div class="degree"><%= col1 %></div></td> \
                                        </tr> \
                                    </tbody> \
                                </table> \
                               </td> \
                               <td>     \
                                <table class="header"> \
                                    <tbody> \
                                        <tr><td class="left-from-header"> </td><td class="header">В&nbsp;пути</td><td class="counter-red"><div class="degree"><%= col2 %></div></td></tr> \
                                    </tbody> \
                                </table> \
                               </td> \
                               <td>     \
                                <table class="header"> \
                                    <tbody> \
                                        <tr><td class="left-from-header"> </td><td class="header">Мой&nbsp;склад</td><td class="counter-green"><div class="degree"><%= col3 %></div></td></tr> \
                                    </tbody> \
                                </table> \
                               </td> \
                              </tr> \
                              <tr class="forsubheader"> \
                                <td> \
                                      <table class="subheader"> \
                                        <tr> \
                                            <td style="width: 94px;">подготовка</td> \
                                            <td style="width: 90px;">счет</td> \
                                            <td style="width: 92px;">разрешена отгрузка</td> \
                                        </tr> \
                                    </table> \
                                </td>             \
                                <td> \
                                    <table class="subheader"> \
                                        <tr> \
                                            <td style="width: 90px;">подбор</td> \
                                            <td style="width: 139px;">транспортировка</td> \
                                        </tr> \
                                    </table> \
                                </td>             \
                                <td> \
                                    <table class="subheader"> \
                                        <tr> \
                                            <td style="width: 92px;">получен</td> \
                                            <td style="width: 92px;">оплачен</td> \
                                            <td style="width: 92px;">закрытие документов</td> \
                                        </tr> \
                                    </table> \
                                </td>             \
                              </tr>     \
                             </tbody> \
                             </table>');

window.JST['orders/order'] = _.template('<a href="#order/<%= id %>" class="<%= state %>"><div class="row"> \
                <div class="order-date"><%= date_order %></div>\
                <% if    (problem == "true") {%>  <div class="problem" > <% }%> \
                     <div class="red"> \
                     <div class="smog"> \
                        <div class="box"> \
                        <div class="only-group"> \
                        <div class="left-bottom-group"> \
                        <div class="right-bottom-group"> \
                        <div class="top-group"> \
                        <div class="car"> \
                        </div> \
                        </div> \
                        </div> \
                        </div> \
                        </div> \
                        </div> \
                        </div> \
                     </div> \
                     </div> \
                 <% if    (problem == "true") {%><div class="order__problem triangle-isosceles left">С&nbsp;заказом есть&nbsp;проблема</div><% }%>\
        </div>\
        </a>');

window.JST['ls/panel'] = _.template(
    '    <div class="yarlyk <% if (problem == "true") { %> red <% } %>" id="<%= state %>"> \
            <% if (message && message.length) { %> <div class="text"><%= message %></div> <% } %>\
        </div> \
    ');

window.JST['ls/timeline'] = _.template(
    '<div id="ruller-separator"></div> \
    <div id="payment-ruller-fon"> \
      <div id="payment-ruller"> \
     <table cellspacing="0" cellpadding="0" border="0"> \
      <tbody> \
       <tr> \
       <% _.each(timeline, function(el){ %> \
        <td class="ruller-point <%= el.state %>"> \
            <img src="/static/dot.gif" /> \
            <div class="tooltip"><%= el.price %>руб.</div> \
            <div class="date"><%= el.date %></div> \
        </td><td class="distance"><img src="/static/img/dot.gif" /></td> \
        <% }) %> \
       </tr> \
      </tbody> \
     </table> \
    </div> \
    <h2>График платежей</h2> \
   </div> \
    ')

window.JST['orderforming/main'] = _.template('\
          <div class="orderforming__trobber-holder"><img class="orderforming__trobber" src="/static/img/495.GIF"/><div class="count-warning">Загрузка заказа может занять длительное время</div></div>\
          <div id="leftpage"> \
        <table id="orderlistheader"> \
            <thead> \
                <tr>\
                <th class="orderforming-number header_sorting_yes" data-sorting="row_num">#</th>\
                <th class="naimenovanie header_sorting_yes" data-sorting="name">наименование</th> \
                <th class="kol-vo header_sorting_yes" data-sorting="amount">кол-во</th> \
                <th class="rekomand">ед. изм</th> \
                <th class="cena header_sorting_yes" data-sorting="price">цена&nbsp;$</th> \
                <th class="skidka header_sorting_yes" data-sorting="discount">спец. скидка</th> \
                <th class="summa header_sorting_yes" data-sorting="summ">сумма&nbsp;$</th> \
                <th class="prod header_sorting_yes" data-sorting="average">средняя<br /> прод.</th> \
                <th class="uslovia header_sorting_yes" data-sorting="special">спец<br />условия</th></tr> \
            </thead> \
        </table> \
        <div id="scroll"> \
          <table id="orderlistcontent" class="orderlistcontent_status_<%= this.model.get("editable") ? "draft" : "undraft" %>"> \
            <tbody> \
            <% _.each(items, function(item, i){ %> \
                <tr data-id="<%= item.id %>" data-pid="<%= item.id %>" data-amount=<%= item.amount %>>\
                    <td class="orderforming-number"><div class="delete icon red-icon">x</div><%= item.row_num %><div class="info icon red-icon">i</div></td>\
                    <td class="naimenovanie"><a <% if(item.product_url) { %>href="<%= item.product_url %>" target="_blank" <% } %>><%= item.name %></a></td> \
                    <td class="kol-vo">\
                    <div style="position:relative;">\
                        <div class="icon-holder icon-holder-left">\
                            <div class="icon icon-super icon-small red-icon minus">1</div>\
                            <div class="icon icon-sub icon-small red-icon minus-ten">10</div>\
                            &ndash;\
                        </div>\
                        <% if (editable) { %>\
                            <input class="amount" type="text" value="<%= item.amount %>"/>&nbsp;\
                        <% } else { %>\
                            <span class="amount"><%= item.amount %></span>\
                        <% } %>\
                        <div class="icon-holder icon-holder-right">\
                            +\
                            <div class="icon icon-super icon-small green-icon plus">1</div>\
                            <div class="icon icon-sub icon-small green-icon plus-ten">10</div>\
                        </div>\
                    </div>\
                    </td> \
                    <td class="rekomand"><%= item.ed_izm %></td> \
                    <td class="cena"><%= item.price && item.price %></td> \
                    <td class="skidka"><%= item.discount %></td> \
                    <td class="summa"><%= item.summ %></td> \
                    <td class="prod"><%= item.average %></td> \
                    <td class="uslovia" title="<%= item.special_full_name %>"><%= item.special %></td>\
                </tr> \
            <% }) %>\
            </tbody> \
           </table> \
        </div> \
        <% if(this.model.get("editable") == 1) { %>\
            <a href="#" onclick="return false;"><img src="/static/img/orderforming/add-poz.png" class="add" alt="Добавить" /></a> \
        <% } else { %>\
            <div class="nondraft-warning">В зарезервированный заказ изменения не вносятся. По всем вопросам обращайтесь к менеджеру. Перейти в <a href="#new_order">новый заказ</a></div>\
        <% } %>\
            <a href="/order/<%= orderId %>/xls/" class="get-xls-link">Скачать XLS</a> \
            <a href="#" class="get-back-link">Назад</a> \
      </div> \
      <div id="rightpage"> \
        <h2>\
        <% if(this.model.get("state") == "draft") { %>\
            Черновик запроса\
        <% } else { %>\
            <%= title_name %>\
        <% } %>\
        </h2> \
        <table id="ordersummary"> \
        <tbody> \
        <% if(date) { %>\
            <tr><td class="rightpagerow" id="orderdate">от <%= date %></td></tr> \
        <% } %>\
        <tr><td class="rightpagerow" style="color:black; font-weight:bold;"> <%= status_name %></td></tr> \
        <% if(weight) { %>\
            <tr><td class="rightpagerow">Вес заказа:</td></tr> \
            <tr><td class="rightpagerow redvalue weight"><%= weight %> кг.</td></tr> \
        <% } %>\
        <% if(rate) { %>\
            <tr><td class="rightpagerow">Курс:</td></tr> \
            <tr><td class="rightpagerow redvalue"><%= rate %> руб.</td></tr> \
        <% } %>\
        <% if(price) { %>\
            <tr><td class="rightpagerow">Итого в у.е.:</td></tr> \
            <tr><td class="rightpagerow redvalue price"><%= price %></td></tr> \
        <% } %>\
        <% if(price_rub) { %>\
            <tr><td class="rightpagerow">Итого в руб.:</td></tr> \
            <tr><td class="rightpagerow redvalue price-rub"><%= price_rub %></td></tr> \
        <% } %>\
        <% if(web_discount) { %>\
            <tr><td class="rightpagerow">Скидка:</td></tr> \
            <tr><td class="rightpagerow redvalue web-discount"><%= web_discount %>%</td></tr> \
        <% } else { %>\
            <tr><td class="rightpagerow">Скидка:</td></tr> \
            <tr><td class="rightpagerow redvalue web-discount">Отсутствует</td></tr> \
        <% } %>\
        <tr class="noline"><td class="rightpagerow rightbutton"><a class="orderforming__call makecall" href="<% print(window.location.href) %>" data-id="<%= orderId %>" onclick="return false">Позвонить</a></td></tr> \
        <tr class="noline"><td class="rightpagerow rightbutton">&nbsp;</td></tr> \
        <% if (this.model.get("state") == "draft") { %>\
            <tr class="noline save"><td class="rightpagerow rightbutton"><a class="orderforming__save" href="/#" onclick="return false">Сохранить черновик</a></td></tr> \
            <tr class="noline"><td class="rightpagerow rightbutton">&nbsp;</td></tr> \
            <tr class="noline rezerv"><td class="rightpagerow rightbutton"><a class="orderforming__rezerv" href="<% print(window.location.href) %>" data-id="<%= orderId %>" onclick="return false">Отправить заказ</a></td></tr> \
            <tr class="noline"><td class="rightpagerow rightbutton">&nbsp;</td></tr> \
        <% } %>\
        </tbody> \
        </table> \
        <% if(this.model.get("state") != "draft") { %>\
        <div id="zakladki"> \
            <a class="zakladka green" href="#order/<%= orderId %>">Заказ</a> \
            <a class="zakladka violet" href="#order/<%= orderId %>/payments">Оплаты</a> \
            <a class="zakladka red" href="#order/<%= orderId %>/chat">Обсуждение заказа</a> \
            <a class="zakladka yellow not-implemented" href="#">Условия договора</a> \
        </div> \
        <% } %>\
      </div> \
    </div>')

window.JST['backorder/main'] = _.template('\
          <div class="orderforming__trobber-holder"><img class="orderforming__trobber" src="/static/img/495.GIF"/></div>\
          <div id="leftpage"> \
        <table id="orderlistheader"> \
            <thead> \
                <tr>\
                <th class="orderforming-number header_sorting_yes" data-sorting="row_num">#</th>\
                <th class="naimenovanie header_sorting_yes" data-sorting="name">наименование</th> \
                <th class="kol-vo header_sorting_yes" data-sorting="amount">кол-во</th> \
                <th class="rekomand">ед. изм</th> \
                <th class="cena header_sorting_yes" data-sorting="price">цена&nbsp;$</th> \
                <th class="summa header_sorting_yes" data-sorting="summ">сумма&nbsp;$</th> \
                <th class="prod header_sorting_yes" data-sorting="date_insert">дата занесения</th> \
                <th class="uslovia header_sorting_yes" data-sorting="last_amount_shipped">кол-во последней отгрузки</tr> \
            </thead> \
        </table> \
        <div id="scroll"> \
          <table id="orderlistcontent" class="orderlistcontent_status_draft"> \
            <tbody> \
            <% _.each(items, function(item, i){ %> \
                <tr data-id="<%= item.id %>" data-pid="<%= item.id %>" data-amount=<%= item.amount %>>\
                <td class="orderforming-number"><div class="delete icon red-icon">x</div><%= item.row_num %></td>\
                <td class="naimenovanie"><a <% if(item.product_url) { %>href="<%= item.product_url %>" target="_blank" <% } %>><%= item.name %></a></td> \
                <td class="kol-vo">\
                <div style="position:relative;">\
                    <div class="icon-holder icon-holder-left">\
                        <div class="icon icon-super icon-small red-icon minus">1</div>\
                        <div class="icon icon-sub icon-small red-icon minus-ten">10</div>\
                        &ndash;\
                    </div>\
                    <span class="amount"><%= item.amount %></span>\
                    <div class="icon-holder icon-holder-right">\
                        +\
                        <div class="icon icon-super icon-small green-icon plus">1</div>\
                        <div class="icon icon-sub icon-small green-icon plus-ten">10</div>\
                    </div>\
                </div>\
                </td> \
                <td class="rekomand"><%= item.ed_izm %></td> \
                <td class="cena"><%= item.price && item.price %></td> \
                <td class="summa"><%= item.summ %></td> \
                <td class="prod"><%= item.date_insert %></td> \
                <td class="uslovia"><%= item.amount_shipped %></td></tr> \
            <% }) %>\
            </tbody> \
           </table> \
        </div> \
            <a href="/order/<%= orderId %>/xls/" class="get-xls-link">Скачать XLS</a> \
            <a href="#" class="get-back-link">Назад</a> \
      </div> \
      <div id="rightpage"> \
        <h2>\
        <% if(this.model.get("state") == "draft") { %>\
            Черновик запроса\
        <% } else { %>\
            <%= head %>\
        <% } %>\
        </h2> \
        <table id="ordersummary"> \
        <tbody> \
        <% if(date) { %>\
            <tr><td class="rightpagerow" id="orderdate">от <%= date %></td></tr> \
            <tr><td class="rightpagerow rowwredline">&nbsp;</td></tr> \
        <% } %>\
        <% if(weight) { %>\
            <tr><td class="rightpagerow">Вес заказа:</td></tr> \
            <tr><td class="rightpagerow redvalue weight"><%= weight %> кг.</td></tr> \
        <% } %>\
        <% if(rate) { %>\
            <tr><td class="rightpagerow">Курс:</td></tr> \
            <tr><td class="rightpagerow redvalue"><%= rate %> руб.</td></tr> \
        <% } %>\
        <% if(price) { %>\
            <tr><td class="rightpagerow">Итого:</td></tr> \
            <tr><td class="rightpagerow redvalue price"><%= price %> руб.</td></tr> \
        <% } %>\
            <tr class="noline"><td class="rightpagerow rightbutton"><a class="orderforming__call makecall" href="<% print(window.location.href) %>" data-id="<%= orderId %>" onclick="return false">Позвонить</a></td></tr> \
            <tr class="noline"><td class="rightpagerow rightbutton">&nbsp;</td></tr> \
        <% if (this.model.get("state") == "draft") { %>\
            <tr class="noline save"><td class="rightpagerow rightbutton"><a class="orderforming__save" href="/#" onclick="return false">Сохранить черновик</a></td></tr> \
            <tr class="noline"><td class="rightpagerow rightbutton">&nbsp;</td></tr> \
            <tr class="noline rezerv"><td class="rightpagerow rightbutton"><a class="orderforming__rezerv" href="<% print(window.location.href) %>" data-id="<%= orderId %>" onclick="return false">Отправить заказ</a></td></tr> \
            <tr class="noline"><td class="rightpagerow rightbutton">&nbsp;</td></tr> \
        <% } %>\
        </tbody> \
        </table> \
        <div id="zakladki"> \
            <a class="zakladka green" href="#order/<%= orderId %>">Заказ</a> \
            <a class="zakladka violet" href="#order/<%= orderId %>/payments">Оплаты</a> \
            <a class="zakladka red" href="#order/<%= orderId %>/chat">Обсуждение заказа</a> \
            <a class="zakladka yellow not-implemented" href="#">Условия договора</a> \
        </div> \
      </div> \
    </div>')


window.JST['payments/main'] = _.template('\
          <div class="orderforming__trobber-holder"><img class="orderforming__trobber" src="/static/img/495.GIF"/></div>\
          <div id="leftpage"> \
        <table id="orderlistheader"> \
            <thead> \
                <tr>\
                <th class="orderforming-number header_sorting_yes" data-sorting="row_num">#</th>\
                <th class="naimenovanie header_sorting_yes" data-sorting="name">Дата</th> \
                <th class="kol-vo header_sorting_yes" data-sorting="amount">Сумма</th> \
                <th class="rekomand">Валюта</th> \
            </thead> \
        </table> \
        <div id="scroll"> \
          <table id="orderlistcontent" class="orderlistcontent_status_draft"> \
            <tbody> \
            <% if(items) { %>\
                <% _.each(items, function(item, i){ %> \
                    <tr data-id="<%= item.id %>" data-pid="<%= item.id %>" data-amount=<%= item.amount %>>\
                    <td class="orderforming-number"><div class="delete icon red-icon">x</div><%= item.payment_date %></td>\
                    <td class="naimenovanie"><a <% if(item.product_url) { %>href="<%= item.product_url %>" target="_blank" <% } %>><%= item.payment_amount %></a></td> \
                    <td class="uslovia"><%= item.currency_name %></td></tr> \
                <% }) %>\
            <% } %>\
            </tbody> \
           </table> \
        </div> \
            <a href="/#order/<%= orderId %>/" class="get-back-link">Назад</a> \
      </div> \
      <div id="rightpage"> \
        <h2>\
        Оплаты\
        </h2> \
        <table id="ordersummary"> \
        <tbody> \
        </tbody> \
        </table> \
        <div id="zakladki"> \
            <a class="zakladka green" href="#order/<%= orderId %>">Заказ</a> \
            <a class="zakladka violet" href="#order/<%= orderId %>/payments">Оплаты</a> \
            <a class="zakladka red" href="#order/<%= orderId %>/chat">Обсуждение заказа</a> \
            <a class="zakladka yellow not-implemented" href="#">Условия договора</a> \
        </div> \
      </div> \
    </div>')

window.JST['orderforming/add1'] = _.template('\
               <div id="good-adding-3" class="single-form"> \
                <div class="single-form-header">Добавление товара</div> \
                <div class="single-form-body"> \
                    <div class="search"><input type="text" size="10" id="search-input" value="<%= searchString %>" /></div> \
                    <div class="list-of-good"> \
                    <% _.each(groups, function(item){ %> \
                            <a class="good-item" data-id="<%= item.id %>"><%= item.name %><% if(item.in_order) { %>(В заказе)<% } %></a> \
                    <% }) %>\
                    </div> \
                    <div class="delimeter"></div> \
                    <div class="single-form-buttons"> \
                        <% if(this.options.item.get("category")) { %><a href="#" class="back">Назад</a><% } %>\
                        <a href="<% print(window.location.href) %>" onclick="return false" id="vybrat-button"><img src="/static/img/orderforming/vybrat.png" alt="" /></a> \
                        <a href="<% print(window.location.href) %>" onclick="return false" id="vybrat-otmena"><img src="/static/img/orderforming/otmena.png" alt="" /></a> \
                    </div> \
                    <div class="delimeter"></div> \
                </div> \
           </div> \
')


window.JST['orderforming/add2'] = _.template('\
               <div id="good-adding-3" class="single-form"> \
                <div class="single-form-header"><%= header %></div> \
                <div class="single-form-body"> \
                  <div class="singleform-left-panrel"> \
                    <div class="list-of-period"> \
                    <% _.each(previous, function(item){ %> \
                        <a class="good-period"><div class="month"><%= item.month %></div><div class="quontity-by-month">Заказано: <span><%= item.amount %></span></div></a> \
                    <% }) %> \
                    </div> \
                  </div> \
                  <div class="singleform-right-panrel"> \
                    <div class="good-property"> \
                        <div class="label">Товар</div> \
                        <div class="value"><%= name %></div> \
                    </div> \
                    <div class="good-property"> \
                        <div class="label">Количество в упаковке</div> \
                        <div class="value"><%= package %> <%= ed_izm %></div> \
                    </div> \
                    <div class="good-property"> \
                        <div class="label">Вес</div> \
                        <div class="value"><%= weight %> кг</div> \
                    </div> \
                    <div class="good-property"> \
                        <div class="label">Цена</div> \
                        <div class="value"><%= price %></div> \
                    </div> \
                    <div class="good-property"> \
                        <div class="label"></div> \
                        <div class="value"></div> \
                    </div> \
                  </div> \
                  <div class="delimeter"></div> \
                  <div class="quontity-entering"> \
                        <div class="quontity-entering-label">Введите количество товара</div> \
                        <span class="sht"><%= ed_izm %></span> \
                        <input type="text" size="10" id="quontity-input" value="<%= amount %>" /> \
                   </div> \
                   <div class="delimeter"></div> \
                   <div class="single-form-buttons"> \
                        <a href="#" class="back">Назад</a>\
                        <a href="<% print(window.location.href) %>" onclick="return false" id="vybrat-button"><img src="/static/img/orderforming/vybrat.png" alt="" /></a> \
                        <a href="<% print(window.location.href) %>" onclick="return false" id="vybrat-otmena"><img src="/static/img/orderforming/otmena.png" alt="" /></a> \
                   </div> \
                  <div class="delimeter"></div> \
                </div> \
        </div>')

window.JST['orderforming/backorder'] = _.template('\
    <div id="good-adding-4" class="single-form"> \
                <div class="single-form-header">Аналоги товара: <span id="tovar-obrazec">Тормозные диски ADC2351</span></div> \
                <div class="single-form-body"> \
                    <table id="zagolovki"> \
                        <tbody> \
                            <tr> \
                                <th class="tovar">Товар</th> \
                                <th class="informacia">Информация</th> \
                                <th class="cena">Цена</th> \
                                <th class="nali4ie">Наличие на складе</th> \
                                <th class="vzakaz">В заказ</th> \
                            </tr> \
                        </tbody> \
                    </table> \
                    <div class="tovaryscroll"> \
                    <table id="analogi"> \
                        <tbody> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                            <tr> \
                                <td class="tovar">Торм. диски ADC2151</td> \
                                <td class="informacia">Полный аналог</td> \
                                <td class="cena">14,25</td> \
                                <td class="nali4ie">6453</td> \
                                <td class="vzakaz"><input type="checkbox" /></td> \
                            </tr> \
                        </tbody> \
                    </table> \
                    </div> \
                   <div class="delimeter"></div> \
                   <div class="single-form-buttons"> \
                        <a href="#" class="back">Назад</a> \
                        <a href="#" onclick="return false" id="vybrat-button"><img src="/static/img/orderforming/vybrat.png" alt="" /></a> \
                        <a href="#" onclick="return false" id="vybrat-otmena"><img src="/static/img/orderforming/otmena.png" alt="" /></a> \
                   </div> \
                  <div class="delimeter"></div> \
                </div> \
            </div> \
            ')

window.JST['chat'] = _.template(
    '<div class="chat">' +
        '<form class="chat__replyform replyform" method="POST" action="/order/<%= orderId %>/messages/send/">' +
            '<textarea class="chat__textarea" name="text" placeholder="Введите текст сообщения"></textarea>' +
            //'<input name="file" type="file" value="Загрузить файл"/>' +
        '</form>' +
        '<div class="chat__right-column">' +
            '<div class="chat__header"></div>' +
            '<span class="regular-btn action-btn chat__send-message">Отправить</span>' +
        '</div>' +
        '<div class="chat__back">' +
            '<span class="regular-btn green-btn action-btn chat__calls-button chat__back-btn">Назад в заказ</span>' +
        '</div>' +
        '<div class="chat__calls">' +
            '<span class="regular-btn green-btn action-btn chat__calls-button makecall">Позвонить ✆</span>' +
            '<span class="regular-btn action-btn chat__calls-button calls__show-button">Список звонков ⇩</span>' +
            '<div class="calls__list">' +
            '</div>' +
        '</div>' +
        '<div class="chat__window"></div>' +
    '</div>'
)

window.JST['message'] = _.template(
    '<div class="message chat_message <% if(!direction) {%> message_from_client <% } %>">' +
        '<div class="message__sender"><%= username %></div>' +
        '<div class="message__time"><%= date %></div>' +
        '<div class="message__body"><%= text %></div>' +
    '</div>'
)

window.JST['call'] = _.template(
    '<div class="call calls__call">' +
        '<div class="call__time"><%= call_date %></div>' +
        '<div class="call__status">Статус: <span class="message__sender-name"><%= status %></span></div>' +
        '<div class="call__duration">Длительность: <%= call_duration %></div>' +
    '</div>'
)

window.JST['confirm'] = _.template(
        '<div class="confirm__text"><%= text %></div>' +
        '<div class="confirm__buttons">' +
            '<div class="confirm__button confirm__button-left"><%= left %></div>' +
            '<div class="confirm__button confirm__button-right"><%= right %></div>' +
        '</div>'
)

window.JST['settings'] = _.template(
    '<div class="settings">' +
        '<% _.each(settings, function(setting){ %>' +
            '<div class="settings_setting">' +
                '<a class="settings__setting-name"><%= setting.name %></a>' +
                '<div class="settings__<%= setting.classname %>"></div>' +
            '</div>' +
        '<% }) %>' +
    '</div>'
)

window.JST['productNaming'] = _.template(
    '<div class="product-naming">' +
        '<div class="product-naming__loading"><div class="product-naming__loading-text">Идет загрузка...</div></div>' +
        '<table class="product-naming__table">' +
            '<thead>' +
                    '<td class="product-naming__table-header-cell product-naming__table-header-cell_first_yes">Клиент</td>' +
                    '<td class="product-naming__table-header-cell">Allied Nippon</td>' +
                    '<td  class="product-naming__clear-cell"><span class="product-naming__clear-row">Очистить</span></td>' +
            '</thead>' +
            '<tbody>' +
                '<% products && _.each(products, function(product) { %>' +
                    '<tr>' +
                        '<td><%= product.customer_product_name %></td>' +
                        '<td>' +
                            '<% if(product.product_name) { %>' +
                                '<%= product.product_name %>' +
                            '<% } else { %>' +
                                '<span data-model-id="<%= product.id %>" class="product-naming__select-position">Выбрать</span>' +
                            '<% } %>' +
                        '</td>' +
                        '<td  class="product-naming__remove-cell"><span data-model-id="<%= product.id %>" class="product-naming__remove-row">Удалить</span></td>' +
                    '</tr>' +
                '<% }) %>' +
            '</tbody>' +
        '</table>' +
        '<div class="product-naming__controls">' +
            '</br>' +
//            '<input class="product-naming__add-row" type="button" value="Добавить строку"/>' +
            '<form class="product-naming__xls-form" method="POST" enctype="multipart/form-data" action="/settings/prodnames/xls/">' +
                '<input type="file" name="file"/>' +
                '<input class="product-naming__upload-file" type="button" value="Загрузить"/>' +
                '</br>' +
                '</br>' +
                '<div>Формат файла для загрузки: xls или xlsx с наименованиями позиций, перечисленными в столбик</div>' +
            '</form>' +
//            '</br>Редактирование разблокировано ' +
//            '<input class="product-naming__save" type="button" value="Сохранить"/>' +
        '</div>' +
        '<div class="product-naming__state">' +
            'На данный момент список одобрен менеджером и используется для создания новых заказов. Внесение любых изменений в список потребует повторного утверждения у менеджера. На время рассмотрения списка создание новых заказов будет заблокировано.' +
        '</div>' +
    '</div>'
)

window.JST['select-position'] = _.template(
    '<div class="select-position">' +
        '<p>' +
            '<h2>Выберите категорию товара</h2>' +
            '<select class="category-select">' +
                '<option>Категория</option>' +
                '<% _.each(groups, function(category) { %>' +
                    '<option value="<%= category.id %>"><%= category.name %></option>' +
                '<% }) %>' +
            '</select>' +
        '</p>' +
        '<% if(group.length) {%>' +
            '<p>' +
                '<h2>Выберите группу товара</h2>' +
                '<select class="group-select">' +
                    '<option>Группа</option>' +
                    '<% _.each(group, function(category) { %>' +
                        '<option value="<%= category.id %>"><%= category.name %></option>' +
                    '<% }) %>' +
                '</select>' +
            '</p>' +
        '<% } %>' +
        '<% if(items.length) {%>' +
            '<p>' +
                '<h2>Выберите группу товара</h2>' +
                '<select class="item-select">' +
                    '<option>Товар</option>' +
                    '<% _.each(items, function(category) { %>' +
                        '<option value="<%= category.id %>"><%= category.name %></option>' +
                    '<% }) %>' +
                '</select>' +
                '<input class="select" type="button" value="Выбрать"/>' +
            '</p>' +
        '<% } %>' +
    '</div>'
)
