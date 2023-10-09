<?php

namespace App\Service;

use App\Entity\Booking;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BookingService
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * Create a new Booking entity.
     *
     * @param array $data The data for creating the booking.
     * @return Booking The created booking.
     * @throws NotFoundHttpException if the status is null.
     */
    public function createBooking(array $data): Booking
    {
        // Validate the incoming data
        $this->validateData($data);

        // Create a new Booking object and set its properties
        $booking = new Booking();
        $booking
            ->setStatus($data['status'])
            ->setDescription($data['description'] ?? null)
            ->setCreatedAt()
            ->setDeletedAt(null);

        // Store the booking in the database
        $this->entityManager->persist($booking);
        $this->entityManager->flush();

        return $booking;
    }

    /**
     * Get all bookings.
     *
     * @return array An array of Booking entities.
     */
    public function getBookings(): array
    {
        $bookingRepository = $this->entityManager->getRepository(Booking::class);
        $bookingQuery = $bookingRepository->createQueryBuilder('b')
            ->where('b.deleted_at IS NULL')
            ->getQuery();

        return $bookingQuery->getResult();
    }

    /**
     * Update an existing Booking entity.
     *
     * @param int $id The ID of the booking to update.
     * @param array $data The data for updating the booking.
     * @return Booking The updated booking.
     */
    public function updateBooking(int $id, array $data): Booking
    {
        // Get the booking by ID, or throw an exception if not found
        $booking = $this->getBookingById($id);

        // Update the booking's properties
        $booking
            ->setStatus($data['status'])
            ->setDescription($data['description'] ?? $booking->getDescription());

        // Save the changes to the database
        $this->entityManager->flush();

        return $booking;
    }

    /**
     * Delete a Booking entity.
     *
     * @param int $id The ID of the booking to delete.
     */
    public function deleteBooking(int $id): void
    {
        // Get the booking by ID, or throw an exception if not found
        $booking = $this->getBookingById($id);

        // Remove the booking from the database
        $booking->setDeletedAt(DateTimeImmutable::createFromFormat('Y-m-d H:i:s', date('Y-m-d H:i:s')));
        $this->entityManager->flush();
    }

    /**
     * Validate the data for creating or updating a booking.
     *
     * @param array $data The data to validate.
     * @throws NotFoundHttpException if the status is null.
     */
    private function validateData(array $data): void
    {
        if (!isset($data['status']) || $data['status'] === null) {
            throw new NotFoundHttpException('Status cannot be null');
        }
    }

    /**
     * Get a Booking entity by its ID.
     *
     * @param int $id The ID of the booking to retrieve.
     * @return Booking The found booking.
     * @throws NotFoundHttpException if the booking is not found.
     */
    private function getBookingById(int $id): Booking
    {
        $booking = $this->entityManager->getRepository(Booking::class)->find($id);

        if (!$booking) {
            throw new NotFoundHttpException('Booking not found');
        }

        return $booking;
    }
}
