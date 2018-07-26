function IndexPage(){
 this.init();
}

IndexPage.prototype={
   init: function(){
    new CommonResourceLoader().loadHeader("header");
   }
}

new IndexPage();