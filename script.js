// อ้างถึงองค์ประกอบต่างๆ ใน DOM
const draggable = document.getElementById('drag-item');
const dropzone = document.getElementById('drop-zone');

// ตัวแปรสำหรับเก็บ ID ขององค์ประกอบที่กำลังถูกลาก
let draggedItemId = null; 

// ----------------------
// 1. เหตุการณ์บนองค์ประกอบที่สามารถลากได้ (draggable)
// ----------------------

// เมื่อการลากเริ่มขึ้น
draggable.addEventListener('dragstart', (e) => {
    // กำหนดข้อมูลที่จะส่งไปพร้อมกับการลาก (ในที่นี้คือ ID ขององค์ประกอบ)
    e.dataTransfer.setData('text/plain', e.target.id);
    draggedItemId = e.target.id;

    // เพิ่มคลาส 'dragging' เพื่อเปลี่ยนสไตล์
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0); 
    // ใช้ setTimeout เพื่อให้แน่ใจว่าการกำหนดสไตล์จะเกิดขึ้นหลังจาก event ถูกประมวลผล
});

// เมื่อการลากสิ้นสุดลง
draggable.addEventListener('dragend', (e) => {
    // ลบคลาส 'dragging' ออก
    e.target.classList.remove('dragging');
    draggedItemId = null;
});

// ----------------------
// 2. เหตุการณ์บนพื้นที่สำหรับวาง (dropzone)
// ----------------------

// ป้องกันพฤติกรรมเริ่มต้นของบราวเซอร์ (สำคัญมากสำหรับการทำ Drop)
// เมื่อองค์ประกอบถูกลากเข้ามาใน Drop Zone
dropzone.addEventListener('dragenter', (e) => {
    e.preventDefault(); 
});

// เมื่อองค์ประกอบกำลังลากอยู่บน Drop Zone
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault(); // ป้องกันพฤติกรรมเริ่มต้น เพื่อให้สามารถ Drop ได้
    
    // เพิ่มคลาส 'dragover' เพื่อเปลี่ยนสไตล์ (ดูใน style.css)
    if (draggedItemId) {
        dropzone.classList.add('dragover');
    }
});

// เมื่อองค์ประกอบถูกลากออกจาก Drop Zone
dropzone.addEventListener('dragleave', (e) => {
    // ลบคลาส 'dragover' ออก
    dropzone.classList.remove('dragover');
});

// เมื่อองค์ประกอบถูกปล่อย (Drop) ลงบน Drop Zone
dropzone.addEventListener('drop', (e) => {
    e.preventDefault(); // ป้องกันพฤติกรรมเริ่มต้น (เช่น การเปิดไฟล์ที่ถูกลาก)
    
    // ลบคลาส 'dragover' ออก
    dropzone.classList.remove('dragover');

    // ดึงข้อมูลที่ถูกตั้งค่าไว้ตอน dragstart
    const id = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(id);

    if (draggedElement) {
        // ย้ายองค์ประกอบไปยัง Drop Zone
        dropzone.appendChild(draggedElement); 
        
        // **การปรับปรุง:** เปลี่ยนเนื้อหา Drop Zone
        draggable.classList.remove('dragging');
        draggable.innerHTML = "I'm in here";
        dropzone.innerHTML = draggable.outerHTML;
        
        // ปรับสไตล์องค์ประกอบที่ถูกย้าย (ไม่บังคับ)
        draggedElement.style.margin = '10px auto';
        draggedElement.style.lineHeight = 'normal';
    }
});