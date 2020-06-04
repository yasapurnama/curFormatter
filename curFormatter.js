var curFormatter = function(){

    this.formatRupiah = function(value, prefix){
        let new_number = value.replace(/[^,\d]/g, '').toString(),
        split = new_number.split(','),
        remains = split[0].length % 3,
        rupiah = split[0].substr(0, remains),
        thousands = split[0].substr(remains).match(/\d{3}/gi);

        if(thousands){
            separator = remains ? '.' : '';
            rupiah += separator + thousands.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? prefix + rupiah : '');
    }

    this.unformatRupiah = function(value){
        let new_number = value.replace(/[^,\d]/g, '').toString().replace('.', '').replace(',', '.');
        return new_number; /*NB: don't reformat this value if decimal number*/
    }

    this.inputOri = function(ele_ori, value){
        let parent = this;
        if(typeof ele_ori == "object")
        {
            ele_ori.value = parent.unformatRupiah(value);
        }
        if(typeof ele_ori == "string")
        {
            let inputs = document.querySelectorAll(ele_ori);
            [].forEach.call(inputs,function(input){
                parent.inputOri(input, value);
            });
        }
    }

    this.input = function(ele, prefix, ele_ori){
        let parent = this;
        if(typeof ele == "object")
        {
            ele.value = parent.formatRupiah(ele.value, prefix);
            parent.inputOri(ele_ori, ele.value);

            ele.addEventListener('keyup',function(){
                ele.value = parent.formatRupiah(ele.value, prefix);
                parent.inputOri(ele_ori, ele.value);
            });
        }
        if(typeof ele == "string")
        {
            let inputs = document.querySelectorAll(ele);
            [].forEach.call(inputs,function(input){
                parent.input(input, prefix, ele_ori);
            });
        }
    }
}