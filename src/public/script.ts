// Function to toggle the edit form visibility
function toggleEditFormVisibility(taskId: number): void {
    const editForm = document.getElementById(`edit-form-${taskId}`) as HTMLElement;
    const taskActions = document.getElementById(`task-actions-${taskId}`) as HTMLElement;

    if (editForm.style.display === 'none' || !editForm.style.display) {
        editForm.style.display = 'block';
        taskActions.style.display = 'none';
    } else {
        editForm.style.display = 'none';
        taskActions.style.display = 'flex';
    }
}

function toggleTaskCompletionStatus(taskId: number): void {
    fetch(`/toggle-status/${taskId}`, { method: 'POST' })
        .then(response => response.json())
        .then((data: { success: boolean }) => {
            if (data.success) {
                const taskItem = document.querySelector(`#task-${taskId}`)?.closest('.task-item') as HTMLElement;
                if (taskItem) {
                    taskItem.classList.toggle('completed');
                }
            }
        })
        .catch((error: Error) => console.error('Error:', error));
}