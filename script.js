const STORAGE_KEY = 'MY_COURSE_DATA';

document.addEventListener('DOMContentLoaded', loadCourses);

// Fungsi Utama: Create atau Update
function saveCourse() {
    const name = document.getElementById('courseName').value;
    const date = document.getElementById('courseDate').value;
    const start = document.getElementById('courseStart').value;
    const end = document.getElementById('courseEnd').value;
    const editIndex = document.getElementById('editIndex').value;

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
        document.getElementById('editIndex').value = ""; // Reset index
    }

    // Simpan ke Local Storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));

    resetForm();
    loadCourses();
}

// Fungsi READ: Tampilkan data
function loadCourses() {
    const courses = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const list = document.getElementById('courseList');
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
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseDate').value = course.date;
    document.getElementById('courseStart').value = course.start;
    document.getElementById('courseEnd').value = course.end;
    document.getElementById('editIndex').value = index;

    // Ubah tampilan tombol
    document.getElementById('saveBtn').innerText = "Update Jadwal";
    document.getElementById('cancelBtn').style.display = "inline-block";
}

// Fungsi Reset Form
function resetForm() {
    document.getElementById('courseName').value = '';
    document.getElementById('courseDate').value = '';
    document.getElementById('courseStart').value = '';
    document.getElementById('courseEnd').value = '';
    document.getElementById('editIndex').value = '';

    document.getElementById('saveBtn').innerText = "Simpan Jadwal";
    document.getElementById('cancelBtn').style.display = "none";
}