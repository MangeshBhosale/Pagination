// var req = new XMLHttpRequest();
// req.open('GET','https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json',true);
// req.send();
// req.onload=function(){
    
//     var data = JSON.parse(this.response)
//         for(var i=0;i<data.length;i++){
//             // console.log(data[i].id+"----"+data[i].name+"----"+data[i].email );
            
//          console.log(i+" before call");
//             add(i);
//             console.log(i+" after call");
           
//         }
//     function add(i){
//          console.log(i+"in call")
//              var row=document.getElementById('row');
//         // // for(var i=0;i<data.length;i++){
//         // //     // console.log(data[i].id+"----"+data[i].name+"----"+data[i].email );
//         var trow = document.createElement("tr");
          
//         row.appendChild(trow);
//         var tdata = document.createElement("td")
//         var tdata2 = document.createElement("td")
//         var tdata3 = document.createElement("td")
//         tdata.setAttribute("id", "dataId");
//         tdata2.setAttribute("id", "dataId2");
//         tdata3.setAttribute("id", "dataId3");
//          trow.appendChild(tdata);
//          trow.appendChild(tdata2);
//          trow.appendChild(tdata3);
//         var id =document.getElementById('dataId');
//         var name =document.getElementById('dataId2');;var mail =document.getElementById('dataId3');

//         id.innerHTML=data[i].id;
//         name.innerHTML=data[i].name;
//         mail.innerHTML=data[i].email;

//         // var thead = document.createElement("th");
//     }
           
           
//       }
        
 var req = new XMLHttpRequest();
req.open('GET','https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json',true);
req.send();

req.onload=function(){   
   var tableData = JSON.parse(this.response)
   var state = {
    'querySet': tableData,

    'page': 1,
    'rows': 5,
    'window': 5,
}

buildTable()

function pagination(querySet, page, rows) {

    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows

    var trimmedData = querySet.slice(trimStart, trimEnd)
console.log(trimmedData);
    var pages = Math.round(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages,
    }
}

function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')

    wrapper.innerHTML = ``
	console.log('Pages:', pages)

    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))

    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }

    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
        	maxLeft = 1
        }
        maxRight = pages
    }
    
    

    for (var page = maxLeft; page <= maxRight; page++) {
    	wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
    }

    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
    }

    $('.page').on('click', function() {
        $('#table-body').empty()

        state.page = Number($(this).val())

        buildTable()
    })

}


function buildTable() {
    var table = $('#table-body')

    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet
    console.log(myList)

    for (var i = 1 in myList) {
        //Keep in mind we are using "Template Litterals to create rows"
        var row = `<tr>
                  <td>${myList[i].id}</td>
                  <td>${myList[i].name}</td>
                  <td>${myList[i].email}</td>
                  `
        table.append(row)
    }

    pageButtons(data.pages)
}

           
        }   
    

