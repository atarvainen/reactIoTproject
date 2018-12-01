@extends('layouts.app')

@section('content')
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">User accounts</div>
                        <div>
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Created</th>
                                            <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <!--Formin luonti, mutta save nappia ei saatu toimimaan jostain tuntemattomasta syystä, Formi muuttaa nimen ja emailin muokattaviksi kentiksi käyttäjä listalla. Deletellä voidaan poistaa käyttäjä tietokannasta.-->
                                        <tbody>
                                            @foreach ($users as $user)
                                              @if ($id == $user->id)
                                                <form role="form" method="POST" action="/save">
                                                    <div calss="form-group">
                                                        <tr class="bg-success">
                                                            <th scope="row">{{ $user->id }}</th>
                                                            <td><input name="name" class="form-control" type="text" size="10" value="{{ $user->name }}"/></td>
                                                            <td><input name="email" class="form-control" type="text" size="15" value="{{ $user->email }}"/></td>
                                                            <td>{{ $user->created_at }}</td>
                                                            <td><a href="/delete/{{ $user->id }}">delete</a><br/><button class="btn btn-primary" type="submit">Save</button></td>
                                                        </tr>
                                                    </div>
                                                </form>
                                            @else
                                            
                                                <tr class="bg-success">
                                                    <th scope="row">{{ $user->id }}</th>
                                                    <td>{{ $user->name }}</td>
                                                    <td>{{ $user->email }}</td>
                                                    <td>{{ $user->created_at }}</td>
                                                    <td><a href="/edit/{{ $user->id }}">edit</a></td>
                                                </tr>
                                            
                                                @endif
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
@endsection
