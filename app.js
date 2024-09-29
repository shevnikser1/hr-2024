// Инициализация сортируемых списков
const pool = document.getElementById('skills-pool');
const mainSkills = document.getElementById('main-skills');
const secondarySkills = document.getElementById('secondary-skills');

// Убираем подсказки при перетаскивании первого элемента
function removePlaceholders(list) {
    const placeholder = list.querySelector('.placeholder');
    if (placeholder) {
        placeholder.remove();
    }
}

// Добавляем подсказки, если все элементы были удалены
function addPlaceholder(list, text) {
    if (!list.children.length) {
        const placeholder = document.createElement('p');
        placeholder.className = 'placeholder';
        placeholder.textContent = text;
        list.appendChild(placeholder);
    }
}

// Инициализация списка навыков
new Sortable(pool, {
    group: 'skills',
    animation: 150,
    onEnd: function(evt) {
        removePlaceholders(evt.to);
        addPlaceholder(evt.from, "Перетащите сюда навык");
    }
});

// Инициализация списка главных навыков
new Sortable(mainSkills, {
    group: 'skills',
    animation: 150,
    onEnd: function(evt) {
        removePlaceholders(mainSkills);
        if (mainSkills.children.length > 3) {
            alert("Вы можете выбрать только 3 главных навыка.");
            pool.appendChild(mainSkills.lastChild); // Возвращаем последний элемент в пул навыков
        }
        addPlaceholder(mainSkills, "Перетащите сюда главные навыки");
    }
});

// Инициализация списка побочных навыков
new Sortable(secondarySkills, {
    group: 'skills',
    animation: 150,
    onEnd: function(evt) {
        removePlaceholders(secondarySkills);
        if (secondarySkills.children.length > 3) {
            alert("Вы можете выбрать только 3 побочных навыка.");
            pool.appendChild(secondarySkills.lastChild); // Возвращаем последний элемент в пул навыков
        }
        addPlaceholder(secondarySkills, "Перетащите сюда побочные навыки");
    }
});

// Генерация портрета вакансии
document.getElementById('generate-portrait').addEventListener('click', function() {
    const position = document.getElementById('position').value;
    const mainSkillsList = [...document.getElementById('main-skills').children].map(item => item.textContent);
    const secondarySkillsList = [...document.getElementById('secondary-skills').children].map(item => item.textContent);

    if (position === '' || mainSkillsList.length !== 3 || secondarySkillsList.length !== 3) {
        alert('Пожалуйста, введите название позиции и выберите 3 главных и 3 побочных навыка.');
        return;
    }

    // Отображаем результат
    document.getElementById('result-position').textContent = position;

    const resultMainSkills = document.getElementById('result-main-skills');
    resultMainSkills.innerHTML = '';
    mainSkillsList.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        resultMainSkills.appendChild(li);
    });

    const resultSecondarySkills = document.getElementById('result-secondary-skills');
    resultSecondarySkills.innerHTML = '';
    secondarySkillsList.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        resultSecondarySkills.appendChild(li);
    });

    document.getElementById('result').classList.remove('hidden');
});
