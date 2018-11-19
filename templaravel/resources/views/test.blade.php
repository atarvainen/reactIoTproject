<?php

$test = <<<EOF
<body>
<h1>Test success</h1>
<button onclick="getarticles()">Get Articles</button>
<button onclick="getarticle()">Get Article 5</button>
<button onclick="postarticle()">Post article</button>
<button onclick="deletearticle()">Delete article</button>
<button onclick="putarticle()">Put article</button>
<div id="result"></div>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script>
	function getarticles(){
		$.ajax({
			url: "http://172.20.10.13/api/articles",
			cache: false,
			method: "GET",
			headers: {
				'Accept':'application/json',
				'Authorization':'Bearer 2XmlfmqUHkl4S2WhjlH1TdP8Z3hLmtoxzYWhIzMiTz3jRUwn2aDxAn4onOWU',
			},
		}).done(function(data) {
			console.log("done");
			showDatas(data);
		}).fail(function() {
			console.log("error");
		}).always(function() {
			console.log("complete");
		});
	}
	
	function showDatas(data){
		$.each(data, function(index,article){
			$("#result").append("<li>"+article.id+" "
				+article.title+" "
				+article.body
				+"</li>");
		});
	}

	function getarticle(){
		$.ajax({
			url: "http://172.20.10.13/api/articles/5",
			cache: false,
			method: "GET",
			headers: {
				'Accept':'application/json',
				'Authorization':'Bearer 2XmlfmqUHkl4S2WhjlH1TdP8Z3hLmtoxzYWhIzMiTz3jRUwn2aDxAn4onOWU',
			},
		}).done(function(data) {
			console.log("done");
			showData(data);
		}).fail(function() {
			console.log("error");
		}).always(function() {
			console.log("complete");
		});
	}
	
	function showData(data){
		$("#result").append("<li>"+data.id+" "
			+data.title+" "
			+data.body
			+"</li>");
	}
	
	function postarticle(){
		$.ajax({
			url: "http://172.20.10.13/api/articles",
			cache: false,
			method: "POST",
			headers: {
				'Accept':'application/json',
				'Authorization':'Bearer mFJNtZUMkGuoykjNg7dzZP4GBZoPTovVyYPMtsvDu2K5GBerjw33SW1XSeao',
				'Content-Type':'application/json',
			},
			data: {
				'title':'post from html',
				'body':'total success',
			}
		}).done(function() {
			console.log("post done");
		}).fail(function() {
			console.log("post error");
		}).always(function() {
			console.log("complete");
		});
	}
	
	function deletearticle(){
		$.ajax({
			url: "http://172.20.10.13/api/articles/67",
			cache: false,
			method: "DELETE",
			headers: {
				'Accept':'application/json',
				'Authorization':'Bearer 2XmlfmqUHkl4S2WhjlH1TdP8Z3hLmtoxzYWhIzMiTz3jRUwn2aDxAn4onOWU',
			},
		}).done(function() {
			console.log("done");
		}).fail(function() {
			console.log("error");
		}).always(function() {
			console.log("complete");
		});
	}
	
	function putarticle(){
		$.ajax({
			url: "http://172.20.10.13/api/articles/65",
			cache: false,
			method: "PUT",
			headers: {
				'Accept':'application/json',
				'Authorization':'Bearer mFJNtZUMkGuoykjNg7dzZP4GBZoPTovVyYPMtsvDu2K5GBerjw33SW1XSeao',
				'Content-Type':'application/json',
			},
			data: {
				'title':'elite title',
			}
		}).done(function() {
			console.log("done");
		}).fail(function() {
			console.log("error");
		}).always(function() {
			console.log("complete");
		});
	}
	
</script>
</body>
EOF;

echo $test;
