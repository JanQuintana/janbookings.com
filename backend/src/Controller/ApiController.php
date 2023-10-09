<?php

namespace App\Controller;

use App\Service\BookingService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiController extends AbstractController
{
    private BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    /**
     * Action to create a booking.
     *
     * @param Request $request The HTTP request.
     * @return JsonResponse
     */
    public function createBooking(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $booking = $this->bookingService->createBooking($data);

        return $this->json(['message' => 'Booking created', 'booking' => $booking], Response::HTTP_CREATED);
    }

    /**
     * Action to get all bookings.
     *
     * @return JsonResponse
     */
    public function getBookings(): JsonResponse
    {
        $bookings = $this->bookingService->getBookings();

        return $this->json($bookings);
    }

    /**
     * Action to update a booking by ID.
     *
     * @param int $id The ID of the booking to update.
     * @param Request $request The HTTP request.
     * @return JsonResponse
     */
    public function updateBooking(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $booking = $this->bookingService->updateBooking($id, $data);

        return $this->json(['message' => 'Booking updated successfully', 'booking' => $booking]);
    }

    /**
     * Action to delete a booking by ID.
     *
     * @param int $id The ID of the booking to delete.
     * @return JsonResponse
     */
    public function deleteBooking(int $id): JsonResponse
    {
        $this->bookingService->deleteBooking($id);

        return $this->json(['message' => 'Booking deleted successfully']);
    }
}
