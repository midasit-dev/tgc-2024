document.getElementById('add-item').addEventListener('click', function() {
  var ul = document.querySelector('#item-list ul');
  var li = document.createElement('li');
  li.textContent = '새 항목';
  ul.appendChild(li);
});