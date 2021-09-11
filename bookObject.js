let myLibrary = [];
const container = document.querySelector('#container');

function Book(title, author, pages, read){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

Book.prototype.info = function info(){
	return (title + " by " + author + ", " + pages + " pages, " + this.haveRead());
}

Book.prototype.haveRead = function haveRead(){
	if(this.read == true){ return "read"} else { return "not read yet"}
}

function addBookToLibrary() {
	// get form info
	let form = document.querySelector('#form');
	let book = new Book(form.elements["title"].value,form.elements["author"].value,form.elements["pages"].value,form.elements["read"].checked);
	// add book to array
	myLibrary.push(book);

	display(book);
	closeForm();
}

function display(book){
	// item container
	let div = document.createElement('div');
	div.textContent = (book.title + " by " + book.author + ", " + book.pages + " pages, " + book.haveRead());
	// read button
	let readButton = document.createElement('button');
	readButton.textContent = "Read";
	readButton.onclick = () => {if (book.read == true){ book.read = false} else {book.read = true} refresh();};
	// delete button
	let deleteButton = document.createElement('button');
	deleteButton.textContent = "Delete";
	deleteButton.onclick = () => {
		let index = myLibrary.indexOf(book);
		myLibrary.splice(index, 1);
		refresh();
	};
	
	div.appendChild(readButton);
	div.appendChild(deleteButton);
	container.appendChild(div);
}

function refresh() {
	container.innerHTML = "";
	displayAll();
}

function displayAll() {
	for (book of myLibrary) {
		display(book);
	}
}

function openForm() {
	let formContainer = document.querySelector('#formContainer');
	formContainer.style.display = "block";
}

function closeForm() {
	let formContainer = document.querySelector('#formContainer');
	let form = document.querySelector('#form');
	formContainer.style.display = "none";
	// clear form
	form.reset();
}

var myBook = new Book("Hitchhiker's Guide to the Galaxy", "Douglas Adams", 100, false);
myLibrary.push(myBook);

displayAll();