<?php

namespace App\Controller;

use App\Entity\Task;
use App\Entity\Category;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Uid\Uuid;


use Doctrine\ORM\EntityManagerInterface;

#[Route('/api/tasks')]
final class TaskController extends AbstractController
{

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    //* Get all tasks
    #[Route('', name: 'app_task_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $repository = $this->entityManager->getRepository(Task::class);
        $tasks = $repository->findAll();
        return $this->json($tasks, Response::HTTP_OK);
    }

    //* Create a new task
    #[Route('', name: 'app_task_new', methods: ['POST'])]
    public function new(): JsonResponse
    {
        $category = new Category();
        $category->setName('Work');
        $this->entityManager->persist($category);

        $task = new Task();
        $task->setTitle('New Task');
        $task->setDescription('This is a new task');
        $task->setStatus(false);
        $task->setCategory($category);

        $this->entityManager->persist($task);
        $this->entityManager->flush();

        return new JsonResponse([
            'message' => 'Task created successfully',
            'task_id' => $task->getId(),
        ], Response::HTTP_CREATED);
    }

    //* Update a task by id
    #[Route('/{id}/status', name: 'app_task_update', methods: ['PATCH'])]
    public function update(string $id): JsonResponse
    {
        $uuid = Uuid::fromString($id);

        $task = $this->entityManager->getRepository(Task::class)->find($uuid);
        $task->setStatus( !$task->isStatus() );

        $this->entityManager->flush();

        return $this->json([
            'message' => "Task with id ${id} status updated successfully"
        ], Response::HTTP_OK);
    }

    //* Delete a task by id
    #[Route('/{id}', name: 'app_task_delete', methods: ['DELETE'])]
    public function delete(string $id): JsonResponse
    {
        $uuid = Uuid::fromString($id);

        $task = $this->entityManager->getRepository(Task::class)->find($uuid);
        $this->entityManager->remove($task);

        $this->entityManager->flush();

        return $this->json([
            'message' => "Task with id ${id} deleted successfully"
        ], Response::HTTP_OK);
    }
}
