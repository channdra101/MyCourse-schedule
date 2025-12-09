const STORAGE_KEY = 'MY_COURSE_DATA';

document.addEventListener('DOMContentLoaded', loadCourses);

// Fungsi Utama: Create atau Update
function saveCourse() {
    const name = document.getElementById('course_name').value;
    const date = document.getElementById('course_date').value;
    const start = document.getElementById('course_start').value;
    const end = document.getElementById('course_end').value;
    const editIndex = document.getElementById('edit_index').value;

    // Validasi Sederhana
    if (!name || !date || !start || !end) {
        alert("Harap isi semua kolom!");
        return;
    }

    // Ambil data lama
    let courses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const courseData = {
        name: name,
        date: date,
        start: start,
        end: end
    };

    if (editIndex === "") {
        // Mode CREATE: Tambah baru
        courses.push(courseData);
    } else {
        // Mode UPDATE: Timpa data lama berdasarkan index
        courses[editIndex] = courseData;
        document.getElementById('edit_index').value = ""; // Reset index
    }

    // Simpan ke Local Storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));

    resetForm();
    loadCourses();
}

// Fungsi READ: Tampilkan data
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const list = document.getElementById('course_list');
    list.innerHTML = '';

    courses.forEach((course, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="info">
                <span class="course-title">${course.name}</span>
                <span class="course-time">📅 ${course.date} | ⏰ ${course.start} - ${course.end}</span>
            </div>
            <div class="btn-group">
                <button class="btn-edit" onclick="editCourse(${index})">Edit</button>
                <button class="btn-delete" onclick="deleteCourse(${index})">Hapus</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// Fungsi DELETE
function deleteCourse(index) {
    if (confirm("Yakin ingin menghapus jadwal ini?")) {
        let courses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        courses.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
        loadCourses();
    }
}

// Fungsi PREPARE EDIT (Memindahkan data ke form)
function editCourse(index) {
    let courses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const course = courses[index];

    // Isi form dengan data yang mau diedit
    document.getElementById('course_name').value = course.name;
    document.getElementById('course_date').value = course.date;
    document.getElementById('course_start').value = course.start;
    document.getElementById('course_end').value = course.end;
    document.getElementById('edit_index').value = index;

    // Ubah tampilan tombol
    document.getElementById('save_btn').innerText = "Update Jadwal";
    document.getElementById('cancel_btn').style.display = "inline-block";
}

// Fungsi Reset Form
function resetForm() {
    document.getElementById('course_name').value = '';
    document.getElementById('course_date').value = '';
    document.getElementById('course_start').value = '';
    document.getElementById('course_end').value = '';
    document.getElementById('edit_index').value = '';

    document.getElementById('save_btn').innerText = "Simpan Jadwal";
    document.getElementById('cancel_btn').style.display = "none";
}