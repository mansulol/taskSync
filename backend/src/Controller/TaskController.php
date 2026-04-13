<?php

namespace App\Controller;

//? App Entities
use App\Entity\Task;
use App\Entity\Category;

//? Doctrine
use Doctrine\ORM\EntityManagerInterface;

//? Symfony Components
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Uid\Uuid;


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
    public function new(Request $request): JsonResponse
    {

        $title = $request->request->get('title');
        $description = $request->request->get('description');
        $categoryName = $request->request->get('category', 'General');

        //! Title is required, return error if not provided
        if (!$title) {
            return $this->json(['error' => 'Title is required'], Response::HTTP_BAD_REQUEST);
        }

        $category = new Category();
        $category->setName($categoryName);
        $this->entityManager->persist($category);

        $task = new Task();
        $task->setTitle($title);
        $task->setDescription($description);
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

        if(!$task) {
            return $this->json([
                'error' => "Task with id ${id} not found"
            ], Response::HTTP_NOT_FOUND);
        }

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

        if(!$task) {
            return $this->json([
                'error' => "Task with id ${id} not found"
            ], Response::HTTP_NOT_FOUND);
        }

        $this->entityManager->remove($task);

        $this->entityManager->flush();

        return $this->json([
            'message' => "Task with id ${id} deleted successfully"
        ], Response::HTTP_OK);
    }

    //* Fallback route for undefined endpoints
    #[Route('/{slug}', name: 'app_fallback', requirements: ['slug' => '.*'], priority: -1)]
    public function notFound(): JsonResponse
    {
        return $this->json([
            'error' => 'Endpoint not found'
        ], Response::HTTP_NOT_FOUND);
    }
}
