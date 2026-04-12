<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class TaskController extends AbstractController
{
    //* Get all tasks
    #[Route('api/tasks', name: 'app_task_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        return $this->json([
            'message' => 'Get all tasks'
        ]);
    }

    //* Create a new task
    #[Route('api/tasks', name: 'app_task_new', methods: ['POST'])]
    public function new(): JsonResponse
    {
        return $this->json([
            'message' => 'Create a new task'
        ]);
    }

    //* Update a task by id
    #[Route('api/tasks/{id}/status', name: 'app_task_update', methods: ['PATCH'])]
    public function update(int $id): JsonResponse
    {
        return $this->json([
            'message' => "Update task ${id}"
        ]);
    }

    //* Delete a task by id
    #[Route('api/tasks/{id}', name: 'app_task_delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        return $this->json([
            'message' => "Delete task ${id}"
        ]);
    }
}
